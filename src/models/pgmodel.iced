pg = require 'pg'

iced = require '../myiced'
iced.util.pollute global

model = require './basemodel'

print = (cb) ->
	(args...) ->
		console.log args
		cb.apply this, args

hash = do ->
	crypto = require 'crypto'
	(key) -> crypto.createHash('md5').update(key).digest 'base64'

module.exports = (connectionString) ->

	listen = (channel, cb, finishcb) ->
		client = new (pg.Client) connectionString
		await client.connect defer()
		client.on 'notification', (msg) ->
			cb null, msg
		client.query "LISTEN #{channel};"
		finishcb? -> client.end()

	class Transaction
		constructor: func (autocb) ->
			await pg.connect connectionString, defer @client
			do @begin

		begin: ->
			@client.query 'begin'

		commit: ->
			@client.query 'commit'

		rollback: ->
			@client.query 'rollback'

		query: func (autocb, config) ->
			config.name = hash config.text
			request = @client.query config
			request.on 'error', (error) ->
				request.error =
					msg: 'pgerror'
					pgerror: error
					query: config
			request
	
		queryMany: func (autocb, config) ->
			if config.cb?
				callbackb = config.cb
				delete config.cb
			else
				callback = (row, res) ->
					res.addRow(row)
			await @query defer(request), config
			request.on 'row', callback
			await request.on 'end', addNull(defer res)
			throw request.error if request.error?
			res.rows
		
		queryOne: func (autocb, config) ->
			await @queryMany defer(res), config
			throwError 'queryOne got no result.', {config: config} unless res[0]?
			res[0]
	
		queryNone: func (autocb, config) ->
			await @queryMany defer(res), config
			null

	class PGObject extends model.ModelObject
#	text
#	values
#	transaction
#	after
#	before
#	expect
		query: func (autocb, config) ->
			transaction = config.transaction
			if transaction? then t = transaction else await t = new Transaction defer()
			catchCB (err) ->
				do t.rollback unless transaction?
				throw err
			if config.before?
				await config.before.call this, defer(), config, t
			await t[config.func] defer(res),
				text: config.text
				values: if config.values? then config.values else []
			if config.after?
				await config.after.call this, defer(result), res, t
				res = result if result?
			t.commit() unless transaction?
			res

		queryNone: (cb, transaction, config) ->
			config.transaction = transaction
			config.func = 'queryNone'
			@query cb, config

		queryOne: (cb, transaction, config) ->
			config.transaction = transaction
			config.func = 'queryOne'
			@query cb, config
		
		queryMany: (cb, transaction, config) ->
			config.transaction = transaction
			config.func = 'queryMany'
			@query cb, config


	class PGEntry extends PGObject
		constructor: (@id) ->


	class Information extends PGObject

		constructor: (@id) ->
			tempType = @constructor.name.toLowerCase()
			@type = tempType if tempType != 'information'
			
		create: (cb, status = 'default', referencing=null, t) ->
			@queryOne cb, t,
				text: 'INSERT INTO information (status) VALUES ($1) RETURNING id;'
				values: [status],
				after: func (autocb, res, transaction) ->
					@id = res.id
					if referencing?
						await @addReference defer(), referencing, transaction
					@id

		addReference: (cb, reference, t) ->
			@queryNone cb, t,
				text: 'INSERT INTO "references" (id, referenceid) VALUES ($1, $2);'
				values: [@id, reference.id]


		removeReference: (cb, reference, t) ->
			@queryNone cb, t,
				text: 'DELETE FROM "references" WHERE id=$1 AND referenceid=$2'
				values: [@id, reference.id]

		getType: func (cb, t) ->
			if @type?
				cb @type
			else
				@queryOne catchNull(cb), t,
					text: 'SELECT type FROM type WHERE id=$1;'
					values: [@id]
					after: func (autocb, res) ->
						if res?
							@type = res.type
						else
							throwError 'Couldnt get Type.', {id: @id}

		get: (cb, t) ->
			@queryOne cb, t,
				before: func (autocb, config, t) ->
					await @getType defer(), t
					config.text = "SELECT * FROM #{@type}view WHERE id=$1;"
				values: [@id]
				after: func (autocb, res, t) ->
					await @getReferences defer(references), t
					res.references = references
					await @getAttachments defer(attachments), t
					res.attachments = attachments
					(@[key] = value) for key,value of res
					res

		setStatus: (cb, status, t) ->
			@queryNone cb, t,
				text: 'UPDATE information SET status=$2 WHERE id=$1;'
				values: [@id, status]

		setDelay: (cb, delay, t) ->
			@queryNone cb, t,
				text: "UPDATE information SET status='inbox', delay=$2 WHERE id=$1;"
				values: [@id, if delay? then do delay.toISOString else null]

		attach: (cb, file, t) ->
			@queryNone cb, t,
				text: 'INSERT INTO attachments (id, fileid) VALUES ($1, $2);'
				values: [@id, file.id]

		detach: (cb, file, t) ->
			@queryNone cb, t,
				text: 'DELETE FROM attachments WHERE id=$1 AND fileid=$2);'
				values: [@id, file.id]

		_set: func (autocb, table, map, allowed, t) ->
			answers = {}
			errors = {}
			await for key, value of map
				if not allowed? or key in allowed
					@queryNone defer(), t,
						text: "UPDATE #{table} SET $2=$3 WHERE id=$1;"
						values: [@id, key, value],
			null

		getReferences: (cb, t) ->
			@queryMany cb, t,
				text: 'SELECT referenceid FROM "references" WHERE id=$1;'
				values: [@id]
				after: func (autocb, res) -> (row.referenceid for row in res)

		getAttachments: (cb, t) ->
			@queryMany cb, t,
				text: 'SELECT fileid FROM attachments WHERE id=$1;'
				values: [@id]
				after: func (autocb, res) -> (row.fileid for row in res)

		_store: (values) ->
			@change values


	class File extends PGObject

		create: (cb, name, t) ->
			@queryOne cb, t,
				text: 'INSERT INTO file (name) VALUES ($1) RETURNING id;'
				values: [name]
				after: func (autocb, res) -> @id = res.id
			
		getName: (cb, t) ->
			@queryOne cb, t,
				text: 'SELECT name FROM file WHERE id=$1;'
				values: [@id]
				after: func (autocb, res) -> res.name

		delete: (cb, t)->
			@queryNone cb, t,
				text: 'DELETE FROM file WHERE id=$1'
				values: [@id]


	class Note extends Information

		create: (cb, content, t) ->
			@queryNone cb, t,
				before: func (autocb, config, t) ->
					await Note.__super__.create.call this, defer(), 'inbox', null, t
					config.values = [@id, content]
				text: 'INSERT INTO note (id, content) VALUES ($1, $2);'
				after: func (autocb) -> @id

		setContent: (cb, content, t) ->
			@queryNone cb, t,
				text: 'UPDATE note SET content=$2 WHERE id=$1'
				values: [@id, content]


	class Task extends Information

		create: (cb, description, referencing=null, t) ->
			@queryNone cb, t,
				before: func (autocb, config, t) ->
					await Task.__super.create.call this, defer(), 'default', referencing, t
					config.values = [@id, content]
				text: 'INSERT INTO task (id, description) VALUES ($1, $2);'
				after: func (autocb) -> @id

		done: (cb, t) ->
			@queryNone cb, t,
				text: 'UPDATE task SET completed=CURRENT_TIMESTAMP WHERE id=$1'
				values: [@id]

		undo: (cb, t) ->
			@queryNone cb, t,
				text: 'UPDATE task SET completed=NULL WHERE id=$1'
				values: [@id]

	class Project extends Task

		create: (cb, description, referencing=null, parent=null, t) ->
			@queryNone cb, t,
				before: func (autocb, config, t) ->
					await super defer(), description, referencing, t
					config.values = [@id, if parent? then parent.id else null]
				text: 'INSERT INTO project (id, parent) VALUES ($1, $2);'
				after: func (autocb) -> @id

		setParent: (cb, parent, t) ->
			@queryNone cb, t,
				text: 'UPDATE project SET parent=$2 WHERE id=$1;'
				values: [@id, if parent? then parent.id else null]

		collapse: (cb, t) ->
			@queryNone cb, t,
				text: 'UPDATE project SET collapsed=TRUE WHERE id=$1;'
				values: [@id]

		uncollapse: (cb, t) ->
			@queryNone
				text: 'UPDATE project SET collapsed=FALSE WHERE id=$1;'
				values: [@id]

		@getAll: (cb, t) ->
			@queryMany cb, t,
				text: 'SELECT * FROM projectview WHERE completed IS NULL;'


	class Asap extends Task

		create: (cb, description, list, referencing=null, project=null, t) ->
			@queryNone cb, t,
				before: func (autocb, config, t) ->
					super defer(), description, referencing, t
					config.values = [@id, list.id, if project? then project.id else null]
				text: 'INSERT INTO asap (id, asaplist, project) VALUES ($1, $2, $3);'
				after: func (autocb) -> @id

		setProject: (cb, project, t) ->
			@queryNone cb, t,
				text: 'UPDATE asap SET project=$2 WHERE id=$1;'
				values: [@id, project.id]


		setList: (cb, list, t) ->
			@queryNone cb, t,
				text: 'UPDATE asap SET asaplist=$2 WHERE id=$1;'
				values: [@id, list.id]

		@getAllFromList: (cb, list, t) ->
			@queryMany cb, t,
				text: 'SELECT * FROM asapview WHERE asaplist=$1 AND completed IS NULL;'
				values: [list.id]

		@getAll: (cb, t) ->
			@queryMany cb, t,
				text: 'SELECT * FROM asapview WHERE completed IS NULL;'

	class AsapList extends PGEntry

		create: (cb, name, t) ->
			@queryOne cb, t,
				text: 'INSERT INTO asaplist (name) VALUES ($1) RETURNING id;'
				values: [name]
				after: func (autocb, res) -> @id = res.id

		rename: (cb, name, t) ->
			@queryNone cb, t,
				text: 'UPDATE asaplist SET name=$2 WHERE id=$1;'
				values: [@id, name]

		delete: (cb, t) ->
			@queryNone cb, t,
				text: 'DELETE FROM asaplist WHERE id=$1;'
				values: [@id]

		@getByName: (cb, name, t) =>
			@queryOne cb, t,
				text: 'SELECT id FROM asaplist WHERE name=$1;'
				values: [name]
				after: func (autocb, res) -> new this res.id

		@getAll: (cb, t) ->
			@queryMany cb, t,
				text: 'SELECT id, name FROM asaplist;'

	class SocialEntity extends Information

		create: (cb) ->
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
	
	class Inbox extends PGObject
		
		getSize: (cb, t) ->
			@queryOne cb, t,
				text: 'SELECT count(*) FROM inbox;'
				after: func (autocb, res) -> res.count

		getFirst: (cb, t) ->
			@queryMany cb, t,
				text: 'SELECT id FROM inbox ORDER BY created_at LIMIT 1;'
				after: func (autocb, res) -> if res[0]?.id? then new Information(res[0].id) else null

		get: (cb, t) ->
			answer = {}
			await
				@getSize defer(error1, answer.size), t
				@getFirst defer(error2, answer.first), t
			if error1? then cb? error1; return
			if error2? then cb? error2; return
			cb? null, answer

	
	class Urgent extends PGObject

		getSize: ->
		getList: ->

	model.extend
		File: File
		Note: Note
		Asap: Asap
		Information: Information
		Project: Project
		AsapList: AsapList
		Circle:Circle
		Contact:Contact
		Place:Place
		Appointment:Appointment
		Protocol:Protocol
		Server:Server
		Account:Account
		Room:Room
		Message:Message
		Presence:Presence
		Resource:Resource
		inbox:new Inbox
		maybe:new Maybe
		urgent:new Urgent
		listen: listen
