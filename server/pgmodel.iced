hash = do ->
	crypto = require "crypto"
	(key) -> crypto.createHash("md5").update(key).digest "base64"

{ModelObject} = require "basemodel"

exports.connect = (connectionString) ->
	pg = require("pg")
	
	listen = (channel, callback, finishcallback) ->
		client = new (pg.Client) connectionString
		await client.connect defer()
		client.on "notification", (msg) -> callback null, msg
		client.query "LISTEN #{channel};"
		finishcallback? -> client.end()

	query = (config, callback) ->
		config.name = hash config.text
		await pg.connect connectionString, defer error, client
		if error? then callback? error; return
		request = client.query config
		request.on "error", (error) ->
			request.error =
				msg: "pgerror"
				pgerror: error
				query: config
		callback? null, request
	
	queryMany = (config, callback) ->
		if config.callback?
			cb = config.callback
			delete config.callback
		else
			cb = (row, result) ->
				result.addRow(row)
		await query config, defer error, request
		if error? then callback? error; return
		request.on "row", cb
		await request.on "end", defer result
		if request.error? then callback? request.error; return
		callback? null, result.rows
		
	queryOne = (config, callback) ->
		await queryMany config, defer error, result
		if error? then callback? error; return
		unless result[0]? then callback {msg: "queryOne got no result.", config: config}; return
		callback? null, result[0]
	
	queryNone = (config, callback) ->
		await queryMany config, defer error, result
		if error? then callback? error; return
		callback? null, null

	class PGObject extends ModelObject
		constructor: (@id) ->


	class Information extends PGObject

		constructor: (@id) ->
			tempType = @constructor.name.toLowerCase()
			@type = tempType if tempType != "information"
			
		create: (status = "default", referencing=null, callback) ->
			await queryOne
				text: "INSERT INTO information (status) VALUES ($1) RETURNING id;"
				values: [status],
					defer error, answer
			if error? then callback? error; return
			@addReference referencing if referencing?
			callback? null, @id = answer.id

		addReference: (reference, callback) ->
			queryNone
				text: "INSERT INTO \"references\" (id, referenceid) VALUES ($1, $2);"
				values: [@id, reference.id],
					callback

		removeReference: (reference, callback) ->
			queryNone
				text: "DELETE FROM \"references\" WHERE id=$1 AND referenceid=$2"
				values: [@id, reference.id],
					callback

		delete: (callback) ->
			queryNone
				text: "DELETE FROM information WHERE id=$1;"
				values: [@id],
					callback

		getType: (callback) ->
			unless @type
				await queryOne
					text: "SELECT type FROM type WHERE id=$1;"
					values: [@id],
						defer error, answer
				if error? then callback? error; return
				unless answer?
					callback? {msg: "Couldnt get Type.", id: @id}
					return
				else
					@type = answer.type
			callback? null, @type

		get: (callback) ->
			await @getType defer error
			if error? then callback? error; return
			unless error?
				await queryOne
					text: "SELECT * FROM #{@type}view WHERE id=$1;"
					values: [@id],
						defer error, answer
			if error? then callback? error; return
			await @getReferences defer error, references
			if error? then callback? error; return
			answer.references = references
			await @getAttachments defer error, attachments
			if error? then callback? error; return
			answer.attachments = attachments
			(@[key] = value) for key,value of answer
			callback null, answer

		setStatus: (status, callback) ->
			queryNone
				text: "UPDATE information SET status=$2 WHERE id=$1;"
				values: [@id, status],
					callback

		setDelay: (delay, callback) ->
			queryNone
				text: "UPDATE information SET status='inbox', delay=$2 WHERE id=$1;"
				values: [@id, delay.toISOString()],
					callback

		attach: (file, callback) ->
			queryNone
				text: "INSERT INTO attachments (id, fileid) VALUES ($1, $2);"
				values: [@id, file.id],
					callback

		detach: (file, callback) ->
			queryNone
				text: "DELETE FROM attachments WHERE id=$1 AND fileid=$2);"
				values: [@id, file.id],
					callback

		_set: (table, map, allowed, callback) ->
			answers = {}
			errors = {}
			await for key, value of map
				if not allowed? or key in allowed
					query
						text: "UPDATE #{table} SET $2=$3 WHERE id=$1;"
						values: [@id, key, value],
							defer errors[key], answers[key]
			callback? errors, answers

		getReferences: (callback) ->
			await queryMany
				text: "SELECT referenceid FROM \"references\" WHERE id=$1;"
				values: [@id],
					defer error, result
			if error? then callback? error; return
			callback? null, (row.referenceid for row in result)

		getAttachments: (callback) ->
			await queryMany
				text: "SELECT fileid FROM attachments WHERE id=$1;"
				values: [@id],
					defer error, result
			if error? then callback? error; return
			callback? null, (row.fileid for row in result)


	class File extends PGObject

		create: (name) ->
			{id: @id} = queryOne
				text: "INSERT INTO file (name) VALUES ($1) RETURNING id;"
				values: [name]
			@id
			
		getName: ->
			answer = queryOne
				text: "SELECT name FROM file WHERE id=$1;"
				values: [@id]
			answer.name

		delete: ->
			query
				text: "DELETE FROM file WHERE id=$1"
				values: [@id]


	class Note extends Information

		create: (content, callback) ->
			await super "inbox", null, defer error
			if error? then callback? error; return
			await queryNone
				text: "INSERT INTO note (id, content) VALUES ($1, $2);"
				values: [@id, content],
					defer error
			if error? then callback? error; return
			callback? null, @id

		setContent: (content, callback) ->
			query
				text: "UPDATE note SET content=$2 WHERE id=$1"
				values: [@id, content],
					callback


	class Task extends Information

		create: (description, referencing=null, callback) ->
			await super "default", referencing, defer error
			if error? then callback? error; return
			queryNone
				text: "INSERT INTO task (id, description) VALUES ($1, $2);"
				values: [@id, description],
					defer error
			if error? then callback? error; return
			callback? null, @id

		done: (callback) ->
			queryNone
				text: "UPDATE task SET completed=CURRENT_TIMESTAMP WHERE id=$1"
				values: [@id],
					callback

		undo: (callback) ->
			queryNone
				text: "UPDATE task SET completed=NULL WHERE id=$1"
				values: [@id],
					callback

	class Project extends Task

		create: (description, referencing=null, parent=null, callback) ->
			await super description, referencing, defer error
			if error? then callback? error; return
			queryNone
				text: "INSERT INTO project (id, parent) VALUES ($1, $2);"
				values: [@id, if parent? then parent.id else null],
					defer error
			if error? then callback? error; return
			callback? null, @id


		setParent: (parent, callback) ->
			queryNone
				text: "UPDATE project SET parent=$2 WHERE id=$1;"
				values: [@id, if parent? then parent.id else null],
					callback

		collapse: (callback) ->
			queryNone
				text: "UPDATE project SET collapsed=TRUE WHERE id=$1;"
				values: [@id],
					callback

		uncollapse: (callback) ->
			queryNone
				text: "UPDATE project SET collapsed=FALSE WHERE id=$1;"
				values: [@id],
					callback

		@getAll: (callback) ->
			queryMany
				text: "SELECT * FROM projectview WHERE completed IS NULL;"
				values: [],
					callback


	class Asap extends Task

		create: (description, list, referencing=null, project=null, callback) ->
			super description, referencing, defer error
			if error? then callback? error; return
			queryNone
				text: "INSERT INTO asap (id, asaplist, project) VALUES ($1, $2, $3);"
				values: [@id, list.id, if project? then project.id else null],
					defer error
			if error? then callback? error; return
			callback? null, @id

		setProject: (project, callback) ->
			queryNone
				text: "UPDATE asap SET project=$2 WHERE id=$1;"
				values: [@id, project.id],
					callback


		setList: (list, callback) ->
			queryNone
				text: "UPDATE asap SET asaplist=$2 WHERE id=$1;"
				values: [@id, list.id],
					callback

		@getAllFromList: (list, callback) ->
			queryMany
				text: "SELECT * FROM asapview WHERE asaplist=$1 AND completed IS NULL;"
				values: [list.id],
					callback

		@getAll: (callback) ->
			queryMany
				text: "SELECT * FROM asapview WHERE completed IS NULL;"
				values: [],
					callback


	class AsapList extends PGObject

		create: (name, callback) ->
			queryOne
				text: "INSERT INTO asaplist (name) VALUES ($1) RETURNING id;"
				values: [name],
					defer error, answer
			if error? then callback? error; return
			callback? null, @id = answer.id

		rename: (name, callback) ->
			queryNone
				text: "UPDATE asaplist SET name=$2 WHERE id=$1;"
				values: [@id, name],
					callback

		delete: (callback) ->
			queryNone
				text: "DELETE FROM asaplist WHERE id=$1;"
				values: [@id],
					callback

		@getByName: (name, callback) =>
			queryOne
				text: "SELECT id FROM asaplist WHERE name=$1;"
				values: [name],
				 	defer error, answer
			if error? then callback? error; return
			callback null, new @ answer.id

		@getAll: (callback) ->
			queryMany
				text: "SELECT id, name FROM asaplist;"
				values: [],
					callback

	class SocialEntity extends Information

		create: (callback) ->
			super()
			queryOne
				text: "INSERT INTO social_entity (id) VALUES ($1);"
				values: [@id]
			@id
			
	class Circle extends SocialEntity

		create: (name) ->
			super()
			queryOne
				text: "INSERT INTO circle (id, name) VALUES ($1, $2);"
				values: [@id, name]
			@id

		@getByName: (name) =>
			answer = queryOne
				text: "SELECT id FROM circle WHERE name=$1;"
				values: [name]
			new @ answer.id

		rename: (name) ->
			queryOne
				text: "UPDATE circle SET name=$2 WHERE id=$1;"
				values: [@id, name]

	class Contact extends SocialEntity

		create: (nameMap) ->
			super()
			queryOne
				text: "INSERT INTO contact (id) VALUES ($1);"
				values: [@id]
			setValues nameMap
			@id

		setValues: (nameMap) ->
			@_set "contact", nameMap, ["name", "first_name", "middle_names", "title", "prefix", "suffix", "nickname", "birthname", "birthday"]

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
			super "default", referencing
			queryOne
				text: "INSERT INTO appointment (id, description, startdate, enddate, time, length) VALUES ($1, $2, $3, $4, $5, $6);"
				values: [@id, description, date, date, time, length]
			@id

		setValues: (valueMap) ->
		
		setPlace: (place) ->

		addException: (appointment, exceptionMove="no") ->
		removeException: (appointment) ->

		addFilter: (type, value) ->
		removeFilter: (type, value) ->

		addParticipant: (participant) ->
		removeParticipant: (participant) ->

	class Protocol extends PGObject
		@find: (name) ->
		delete: ->
	
	class Server extends PGObject
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

	class Resource extends PGObject
		create: (name, status, message) ->
		delete: ->
	
	class Daemon extends PGObject
		registrate: (name, status) ->
		setStatus: (status) ->
		setMessage: (message) ->
		deregistrate: ->
		@getAll: ->
	
	class Maybe extends ModelObject

		getSize: ->
		getList: ->
			queryMany
				text: "SELECT * FROM maybe ORDER BY last_edited;"
				values: []
	
	class Inbox extends ModelObject
		
		getSize: (callback) ->
			await queryOne
				text: "SELECT count(*) FROM inbox;"
				values: [],
					defer error, answer
			if error? then callback? error; return
			callback? null, answer?.count

		getFirst: (callback) ->
			await queryOne
				text: "SELECT id FROM inbox ORDER BY created_at LIMIT 1;"
				values: [],
					defer error, answer
			if error? then callback? error; return
			callback? null, if answer?.id? then new Information answer.id else null

		get: (callback) ->
			answer = {}
			await
				@getSize defer error1, answer.size
				@getFirst defer error2, answer.first
			if error1? then callback? error1; return
			if error2? then callback? error2; return
			callback? null, answer

	
	class Urgent extends ModelObject

		getSize: ->
		getList: ->

	model =
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
		Inbox:Inbox
		Maybe:Maybe
		Urgent:Urgent
		listen: listen
