pg = require('pg').native
crypto = require 'crypto'
util = require('libsecretarius').util

hash = (key) -> crypto.createHash('md5').update(key).digest 'base64'

module.exports = (connectionString) ->
	model = {}

	getClient = (cb) ->
		pg.connect connectionString, (error, client, done) ->
			cb error,
				client: client
				done: done

	model.listen = (channel, cb, _) ->
		client = getClient(_).client
		client.on 'notification', cb
		client.query "LISTEN #{channel};"

	class Transaction
		constructor: (_) ->
			{client: @client, done: @done} = getClient _
			@client.query 'begin', _

		commit: (_) ->
			@client.query 'commit', _
			do @done

		rollback: (_) ->
			@client.query 'rollback', _
			do @done

		queryMany: (_, config) ->
			config.name = hash config.text
			@client.query(config, _).rows
		
		queryOne: (_, config) ->
			res = @queryMany _, config
			throw new Error 'queryOne got no result' unless res[0]?
			res[0]
	
		queryNone: (_, config) ->
			@queryMany _, config
			null

#	text
#	values
#	transaction
#	after
#	before
#	expect
	query = (_, config) ->
			transaction = config.transaction
			t = if transaction? then transaction else new Transaction _
			try
				if config.before?
					config.before.call this, _, config, t
				res = t[config.func] _,
					text: config.text
					values: if config.values? then config.values else []
				if config.after?
					result = config.after.call this, _, res, t
					res = result if result?
				t.commit _ unless transaction?
			catch error
				t.rollback _ unless transaction?
				throw error
			res

	queryNone = (_, transaction, config) ->
			config.transaction = transaction
			config.func = 'queryNone'
			query _, config

	queryOne = (_, transaction, config) ->
			config.transaction = transaction
			config.func = 'queryOne'
			query _, config
		
	queryMany = (_, transaction, config) ->
			config.transaction = transaction
			config.func = 'queryMany'
			query _, config

#	timeOutID = null
#	do triggerInboxchangeOnDelay = ->
#		clearTimeout timeOutID
#		await queryMany defer(error, res), null,
#			text: 'SELECT delay FROM information WHERE delay > CURRENT_TIMESTAMP ORDER BY delay LIMIT 1;'
#		if res.length > 0
#			timeOutID = setTimeout (->
#				queryNone (->), null,
#					text: 'NOTIFY inboxchange;'), new Date(res[0].delay).getTime() - new Date().getTime()
#	listen 'inboxchange', triggerInboxchangeOnDelay

	class model.Information
		constructor: (@id) ->
			tempType = @constructor.name.toLowerCase()
			@type = tempType if tempType != 'information'
			
		create: (_, status = 'default', referencing = null, t) ->
			queryOne _, t,
				text: 'INSERT INTO information (status) VALUES ($1) RETURNING id;'
				values: [status],
				after: (_, res, t) =>
					@id = res.id
					@addReference _, referencing, t if referencing?
					@id

		addReference: (_, reference, t) ->
			queryNone _, t,
				text: 'INSERT INTO "references" (id, referenceid) VALUES ($1, $2);'
				values: [@id, reference]


		removeReference: (_, reference, t) ->
			queryNone _, t,
				text: 'DELETE FROM "references" WHERE id=$1 AND referenceid=$2'
				values: [@id, reference]

		getType: (_, t) ->
			@get(_).type

		get: (_, t) ->
			queryOne _, t,
				text: "SELECT getInformation($1) as info;"
				values: [@id]
				after: (_, res, t) -> JSON.parse res.info

		setStatus: (_, status, t) ->
			queryNone _, t,
				text: 'UPDATE information SET status=$2 WHERE id=$1;'
				values: [@id, status]

		setDelay: (_, delay, t) ->
			queryNone _, t,
				text: "UPDATE information SET status='inbox', delay=$2 WHERE id=$1;"
				values: [@id, if delay? then do delay.toISOString else null]

		attach: (_, file, t) ->
			queryNone _, t,
				text: 'INSERT INTO attachments (id, fileid) VALUES ($1, $2);'
				values: [@id, file]

		detach: (_, file, t) ->
			queryNone _, t,
				text: 'DELETE FROM attachments WHERE id=$1 AND fileid=$2);'
				values: [@id, file]

		_set: (_, table, map, allowed, t) ->
			answers = []
			for key, value of map
				if not allowed? or key in allowed
					answers.push queryNone null, t,
						text: "UPDATE #{table} SET $2=$3 WHERE id=$1;"
						values: [@id, key, value],
			for future in answers
				future _
			null


		getReferences: (_, t) ->
			queryMany _, t,
				text: 'SELECT referenceid FROM "references" WHERE id=$1;'
				values: [@id]
				after: (_, res) -> (row.referenceid for row in res)

		getAttachments: (_, t) ->
			queryMany _, t,
				text: 'SELECT fileid FROM attachments WHERE id=$1;'
				values: [@id]
				after: (_, res) -> (row.fileid for row in res)

		@getAllIDs: (_, t) ->
			queryOne _, t,
				text: "select array_to_json(array_agg(id)) as list from #{@.name.toLowerCase()};"
				after: (_, res) -> if res.list? then JSON.parse res.list else []


		@getAll: (_, t) ->
			queryOne _, t,
				text: "SELECT array_to_json(array_agg(getInformation(id))) as list FROM #{@.name.toLowerCase()};"
				after: (_, res) -> if res.list? then JSON.parse res.list else []
		###
	class File extends PGObject

		create: (cb, name, t) ->
			@queryOne cb, t,
				text: 'INSERT INTO file (name) VALUES ($1) RETURNING id;'
				values: [name]
				after: func (autocb, res) -> @id = res.id
			
		getName: (cb, t) ->
			@queryOne _, t,
				text: 'SELECT name FROM file WHERE id=$1;'
				values: [@id]
				after: func (auto_, res) -> res.name

		delete: (_, t)->
			@queryNone _, t,
				text: 'DELETE FROM file WHERE id=$1'
				values: [@id]

###
	class model.Note extends model.Information

		create: (_, content, status = 'inbox', t) ->
			queryNone _, t,
				before: (_, config, t) =>
					model.Information::create.call this, _, status, null, t
					config.values = [@id, content]
				text: 'INSERT INTO note (id, content) VALUES ($1, $2);'
				after: (_) => @id

		setContent: (_, content, t) ->
			queryNone _, t,
				text: 'UPDATE note SET content=$2 WHERE id=$1'
				values: [@id, content]


	class model.Task extends model.Information

		create: (_, description, referencing = null, parent = null, t) ->
			queryNone _, t,
				before: (_, config, t) ->
					model.Information::create.call this, _, 'default', referencing, t
					config.values = [@id, description, parent]
				text: 'INSERT INTO task (id, description, parent) VALUES ($1, $2, $3);'
				after: (_) => @id

		done: (_, t) ->
			queryNone _, t,
				text: 'UPDATE task SET completed=CURRENT_TIMESTAMP WHERE id=$1'
				values: [@id]

		undo: (_, t) ->
			queryNone _, t,
				text: 'UPDATE task SET completed=NULL WHERE id=$1'
				values: [@id]

		setParent: (_, parent, t) ->
			queryNone _, t,
				text: 'UPDATE task SET parent=$2 WHERE id=$1;'
				values: [@id, parent]

		setDeadline: (_, deadline, t) ->
			queryNone _, t,
				text: "UPDATE task SET deadline=$2 WHERE id=$1;"
				values: [@id, if deadline? then do deadline.toISOString else null]

		setDescription: (_, description, t) ->
			queryNone _, t,
				text: 'update task set description=$2 where id=$1'
				values: [@id, description]


	class model.Project extends model.Task

		create: (_, description, referencing = null, parent = null, t) ->
			queryNone _, t,
				before: (_, config, t) =>
					model.Task::create.call this, _, description, referencing, parent, t
					config.values = [@id]
				text: 'INSERT INTO project (id) VALUES ($1);'
				after: (_) -> @id

		collapse: (_, t) ->
			queryNone _, t,
				text: 'UPDATE project SET collapsed=TRUE WHERE id=$1;'
				values: [@id]

		uncollapse: (_, t) ->
			queryNone _, t,
				text: 'UPDATE project SET collapsed=FALSE WHERE id=$1;'
				values: [@id]

	class model.Asap extends model.Task

		create: (_, description, list, referencing=null, project=null, t) ->
			queryNone _, t,
				before: (_, config, t) ->
					model.Task::create.call this, _, description, referencing, project, t
					config.values = [@id, list]
				text: 'INSERT INTO asap (id, asaplist) VALUES ($1, $2);'
				after: (_) -> @id

		setList: (_, list, t) ->
			queryNone _, t,
				text: 'UPDATE asap SET asaplist=$2 WHERE id=$1;'
				values: [@id, list]

	class model.AsapList extends model.Information

		create: (_, name, t) ->
			queryNone _, t,
				before: (_, config, t) ->
					model.Information::create.call this, _, 'default', null, t
					config.values = [@id, name]
				text: 'INSERT INTO asaplist (id, name) VALUES ($1, $2);'
				after: (_) -> @id

		rename: (_, name, t) ->
			queryNone _, t,
				text: 'UPDATE asaplist SET name=$2 WHERE id=$1;'
				values: [@id, name]
		###
	class SocialEntity extends Information

		create: (_) ->
			super()
			queryOne
				text: 'INSERT INTO social_entity (id) VALUES ($1);'
				values: [@id]
			@id
			
	class Circle extends SocialEntity

		create: (name) ->
			super()
			queryOne
				text: 'INSERT INTO circle (id, name) VALUES ($1, $2);'
				values: [@id, name]
			@id

		@getByName: (name) =>
			answer = queryOne
				text: 'SELECT id FROM circle WHERE name=$1;'
				values: [name]
			new @ answer.id

		rename: (name) ->
			queryOne
				text: 'UPDATE circle SET name=$2 WHERE id=$1;'
				values: [@id, name]

	class Contact extends SocialEntity

		create: (nameMap) ->
			super()
			queryOne
				text: 'INSERT INTO contact (id) VALUES ($1);'
				values: [@id]
			setValues nameMap
			@id

		setValues: (nameMap) ->
			@_set 'contact', nameMap, ['name', 'first_name', 'middle_names', 'title', 'prefix', 'suffix', 'nickname', 'birthname', 'birthday']

		addAccount: (account, description=null, priority=0) ->

		removeAccount: (account) ->
		addAddress: (place, description=null) ->

		removeAddress: (place) ->
		enterCircle: (circle) ->
		leaveCircle: (circle) ->

	class Place extends Information

		create: (valueMap) ->

		setValues: (valueMap) ->
		setParent: (place) ->
		removeParent: ->

	class Appointment extends Information

		create: (description, date, time=null, length=null, referencing=null) ->
			super 'default', referencing
			queryOne
				text: 'INSERT INTO appointment (id, description, startdate, enddate, time, length) VALUES ($1, $2, $3, $4, $5, $6);'
				values: [@id, description, date, date, time, length]
			@id

		setValues: (valueMap) ->
		
		setPlace: (place) ->

		addException: (appointment, exceptionMove='no') ->
		removeException: (appointment) ->

		addFilter: (type, value) ->
		removeFilter: (type, value) ->

		addParticipant: (participant) ->
		removeParticipant: (participant) ->

	class Protocol extends PGEntry
		@find: (name) ->
		delete: ->
	
	class Server extends PGEntry
		@find: (name, protocol) ->
		delete: ->

	class Communicator extends Information
		create: (username, server) ->
		changeServer: (server) ->
		setValues: (valueMap) ->

	class Account extends Communicator
		create: (username, server) ->
		@find: (username, server) ->
		join: (room, role=null) ->
		leave: (room, role=null) ->
	
	class UserAccount extends Account

		setValues: ->
		create: (account) ->
		downGrade: ->
		@getAll: ->

	class Room extends Communicator
		create: (name) ->
		setMOTD: (motd) ->
	
	class Communication extends Information
		create: (from, time=new Date()) ->
		setSender: (from) ->
		setTime: (time=new Date()) ->
		send: ->
		sent: ->
		draft: ->
		addRecipient: (recipient, mode, resource=null) ->
		removeRecipient: (recipient, mode) ->
		getToSend: (from) ->

	class Message extends Communication
		create: (from, subject=null, body=null, time=new Date()) ->
		setValues: (valueMap) ->

	class Presence extends Communication
		create: (from, time=new Date()) ->
		addResource: (resource) ->

	class Resource extends PGEntry
		create: (name, status, message) ->
		delete: ->
	
	class Daemon extends PGEntry
		registrate: (name, status) ->
		setStatus: (status) ->
		setMessage: (message) ->
		deregistrate: ->
		@getAll: ->
	
	class Maybe extends PGObject

		getSize: ->
		getList: ->
			queryMany
				text: 'SELECT * FROM maybe ORDER BY last_edited;'
				values: []
###
	class Inbox
		getSize: (_, t) ->
			queryOne _, t,
				text: 'SELECT count(*) FROM inbox;'
				after: (_, res) -> res.count

		getFirst: (_, t) ->
			queryMany _, t,
				text: 'SELECT id FROM inbox ORDER BY "createdAt" LIMIT 1;'
				after: (_, res) -> res[0]?.id

		get: (_, t) ->
			size = @getSize null, t
			first = @getFirst null, t
			{size: size(_), first: first(_)}
	###
	
	class Urgent extends PGObject

		getSize: ->
		getList: ->
###
	model.inbox = new Inbox

	model
