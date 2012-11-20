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
		await pg.connect connectionString, defer client
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
		request.on "row", cb
		await request.on "end", defer result
		error = request.error if request.error?
		callback? error, result?.rows
		
	queryOne = (config, callback) ->
		await queryMany config, defer error, result
		callback? error, result?[0]
	
	queryNone = (config, callback) ->
		await queryMany config, defer error, result
		callback? error, {msg: "succes"}

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
					defer error, {id: @id}
			@addReference referencing if referencing?
			callback? error, @id

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
				unless answer? and not error?
					error = {msg: "Couldnt get Type.", id: @id}
				else
					@type = answer.type
			callback? error, @type

		get: (callback) ->
			await @getType defer error
			unless error?
				await queryOne
					text: "SELECT * FROM #{@type}view WHERE id=$1;"
					values: [@id],
						defer error, answer
			unless error?
				await @getReferences defer error, references
			unless error?
				answer.references = references
				await @getAttachments defer error, attachments
			unless error?
				answer.attachments = attachments
				(@[key] = value) for key,value of answer
			callback error, answer

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
			callback? error, (row.referenceid for row in result)

		getAttachments: (callback) ->
			await queryMany
				text: "SELECT fileid FROM attachments WHERE id=$1;"
				values: [@id],
					defer error, result
			callback? error, (row.fileid for row in result)


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
			callback? error if error?
			await queryOne
				text: "INSERT INTO note (id, content) VALUES ($1, $2);"
				values: [@id, content],
					defer error
			callback? error, @id

		setContent: (content, callback) ->
			query
				text: "UPDATE note SET content=$2 WHERE id=$1"
				values: [@id, content],
					callback


	class Task extends Information

		create: (description, referencing=null) ->
			super "default", referencing
			queryOne
				text: "INSERT INTO task (id, description) VALUES ($1, $2);"
				values: [@id, description]
			@id

		done: ->
			query
				text: "UPDATE task SET completed=CURRENT_TIMESTAMP WHERE id=$1"
				values: [@id]

		undo: ->
			query
				text: "UPDATE task SET completed=NULL WHERE id=$1"
				values: [@id]

	class Project extends Task

		create: (description, referencing=null, parent=null) ->
			super description, referencing
			queryOne
				text: "INSERT INTO project (id, parent) VALUES ($1, $2);"
				values: [@id, parent]
			@id

		setParent: (parent) ->
			query
				text: "UPDATE project SET parent=$2 WHERE id=$1;"
				values: [@id, if parent? then parent.id else null]

		collapse: ->
			query
				text: "UPDATE project SET collapsed=TRUE WHERE id=$1;"
				values: [@id]

		uncollapse: ->
			query
				text: "UPDATE project SET collapsed=FALSE WHERE id=$1;"
				values: [@id]

		@getAll: () ->
			queryMany
				text: "SELECT * FROM projectview WHERE completed IS NULL;"
				values: []


	class Asap extends Task

		create: (description, list, referencing=null, project=null) ->
			super description, referencing
			queryOne
				text: "INSERT INTO asap (id, asaplist, project) VALUES ($1, (SELECT id FROM asaplist WHERE name=$2), $3);"
				values: [@id, list, project]
			@id

		setProject: (project) ->
			query
				text: "UPDATE asap SET project=$2 WHERE id=$1;"
				values: [@id, project]

		setList: (list) ->
			query
				text: "UPDATE asap AS a SET asaplist=l.id FROM asaplist l WHERE l.name=$2 AND a.id=$1;"
				values: [@id, list]

		@getAllFromList: (list) ->
			queryMany
				text: "SELECT a.* FROM asapview a WHERE a.asaplist=$1 AND completed IS NULL;"
				values: [list]

		@getAll: () ->
			queryMany
				text: "SELECT * FROM asapview WHERE completed IS NULL;"
				values: []


	class AsapList extends PGObject

		create: (name) ->
			{id: @id} = queryOne
				text: "INSERT INTO asaplist (name) VALUES ($1) RETURNING id;"
				values: [name]
			@id

		rename: (name) ->
			query
				text: "UPDATE asaplist SET name=$2 WHERE id=$1;"
				values: [@id, name]

		delete: ->
			query
				text: "DELETE FROM asaplist WHERE id=$1;"
				values: [@id]

		@getByName: (name) =>
			answer = queryOne
				text: "SELECT id FROM asaplist WHERE name=$1;"
				values: [name]
			new @ answer.id

		@getAll: ->
			queryMany
				text: "SELECT id, name FROM asaplist;"
				values: []

	class SocialEntity extends Information

		create: ->
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
			callback? error, answer?.count

		getFirst: (callback) ->
			await queryOne
				text: "SELECT id, type FROM inbox ORDER BY created_at LIMIT 1;"
				values: [],
					defer error, answer
			callback? error, if answer?.id? then new Information answer.id else null

	
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
