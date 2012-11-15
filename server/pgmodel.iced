hash = do ->
	crypto = require 'crypto'
	(key) -> crypto.createHash('md5').update(key).digest 'base64'

{ModelObject} = require "basemodel"

exports.connect = (connectionString) ->
	pg = require('pg').native

	query = (config, callback, errorcallback) ->
		config.name = hash config.text
		await pg.connect connectionString, defer client
		request = client.query config
		request.on 'error', (error) -> errcb error
		callback? request
	
	queryMany = (config, callback, errorcallback) ->
		if config.callback?
			cb = config.callback
			delete config.callback
		else
			cb = (row, result) -> result.addRow(row)
		await query(config, defer request, errorcallback)
		request.on 'row', cb
		await request.on 'end', defer result
		callback result.rows
		
	queryOne = (config, callback, errorcallback) ->
		await queryMany config, defer result, errorcallback
		callback result[0]

	class PGObject extends ModelObject
		constructor: (@id) ->


	class Information extends PGObject

		constructor: (@id) ->
			tempType = @constructor.name.toLowerCase()
			@type = tempType if tempType != 'information'
			
		create: (status = 'default', referencing=null, callback, errorcallback) ->
			await queryOne
				text: 'INSERT INTO information (status) VALUES ($1) RETURNING id;'
				values: [status],
					defer {id: @id}, errorcallback
			@addReference referencing if referencing?
			callback? @id

		addReference: (reference, callback, errorcallback) ->
			query
				text: 'INSERT INTO "references" (id, referenceid) VALUES ($1, $2);'
				values: [@id, reference.id],
					callback, errorcallback

		removeReference: (reference, callback, errorcallback) ->
			query
				text: 'DELETE FROM references WHERE id=$1 AND referenceid=$2'
				values: [@id, reference.id],
					callback, errorcallback

		delete: (callback, errorcallback) ->
			query
				text: 'DELETE FROM information WHERE id=$1;'
				values: [@id],
					callback, errorcallback

		getType: (callback, errorcallback) ->
			unless @type
				await queryOne
					text: 'SELECT type FROM type WHERE id=$1;'
					values: [@id],
						defer({type: @type}), errorcallback
			callback? @type

		get: (callback, errorcallback) ->
			await @getType defer()
			await queryOne
				text: 'SELECT * FROM #{@type}view WHERE id=$1;'
				values: [@id],
					defer(answer), errorcallback
			(@[key] = value) for key,value of answer
			callback answer

		setStatus: (status, callback, errorcallback) ->
			query
				text: 'UPDATE information SET status=$2 WHERE id=$1;'
				values: [@id, status],
					callback, errorcallback

		setDelay: (delay, callback, errorcallback) ->
			query
				text: 'UPDATE information SET status="inbox", delay=$2 WHERE id=$1;'
				values: [@id, delay],
					callback, errorcallback

		attach: (file, callback, errorcallback) ->
			query
				text: 'INSERT INTO "attachments" (id, fileid) VALUES ($1, $2)'
				values: [@id, file.id],
					callback, errorcallback

		detach: (file, callback, errorcallback) ->
			query
				text: 'DELETE FROM "attachments" WHERE id=$1 AND fileid=$2)'
				values: [@id, file.id],
					callback, errorcallback

		_set: (table, map, allowed, callback, errorcallback) ->
			for key, value of map
				if not allowed? or key in allowed
					query
						text: 'UPDATE #{table} SET $2=$3 WHERE id=$1;'
						values: [@id, key, value],
							callback, errorcallback

		getReferences: ->


	class File extends PGObject

		create: (name) ->
			{id: @id} = queryOne
				text: 'INSERT INTO file (name) VALUES ($1) RETURNING id;'
				values: [name]
			@id
			
		getName: ->
			answer = queryOne
				text: 'SELECT name FROM file WHERE id=$1;'
				values: [@id]
			answer.name

		delete: ->
			query
				text: 'DELETE FROM file WHERE id=$1'
				values: [@id]


	class Note extends Information

		create: (content, attachment=null, callback, errorcallback) ->
			await super defer(id), errorcallback
			await queryOne
				text: 'INSERT INTO note (id, content, attachment) VALUES ($1, $2, $3);'
				values: [@id, content, attachment],
					defer(id), errorcallback
			callback? id

		change: (content, callback, errorcallback) ->
			query
				text: 'UPDATE note SET content=$2 WHERE id=$1'
				values: [@id, content],
					callback, errorcallback


	class Task extends Information

		create: (description, referencing=null) ->
			super 'default', referencing
			queryOne
				text: 'INSERT INTO task (id, description) VALUES ($1, $2);'
				values: [@id, description]
			@id

		done: ->
			query
				text: 'UPDATE task SET completed=CURRENT_TIMESTAMP WHERE id=$1'
				values: [@id]

		undo: ->
			query
				text: 'UPDATE task SET completed=NULL WHERE id=$1'
				values: [@id]

	class Project extends Task

		create: (description, referencing=null, parent=null) ->
			super description, referencing
			queryOne
				text: 'INSERT INTO project (id, parent) VALUES ($1, $2);'
				values: [@id, parent]
			@id

		setParent: (parent) ->
			query
				text: 'UPDATE project SET parent=$2 WHERE id=$1;'
				values: [@id, if parent? then parent.id else null]

		collapse: ->
			query
				text: 'UPDATE project SET collapsed=TRUE WHERE id=$1;'
				values: [@id]

		uncollapse: ->
			query
				text: 'UPDATE project SET collapsed=FALSE WHERE id=$1;'
				values: [@id]

		@getAll: () ->
			queryMany
				text: 'SELECT * FROM projectview WHERE completed IS NULL;'
				values: []


	class Asap extends Task

		create: (description, list, referencing=null, project=null) ->
			super description, referencing
			queryOne
				text: 'INSERT INTO asap (id, asaplist, project) VALUES ($1, (SELECT id FROM asaplist WHERE name=$2), $3);'
				values: [@id, list, project]
			@id

		setProject: (project) ->
			query
				text: 'UPDATE asap SET project=$2 WHERE id=$1;'
				values: [@id, project]

		setList: (list) ->
			query
				text: 'UPDATE asap AS a SET asaplist=l.id FROM asaplist l WHERE l.name=$2 AND a.id=$1;'
				values: [@id, list]

		@getAllFromList: (list) ->
			queryMany
				text: 'SELECT a.* FROM asapview a WHERE a.asaplist=$1 AND completed IS NULL;'
				values: [list]

		@getAll: () ->
			queryMany
				text: 'SELECT * FROM asapview WHERE completed IS NULL;'
				values: []


	class AsapList extends PGObject

		create: (name) ->
			{id: @id} = queryOne
				text: 'INSERT INTO asaplist (name) VALUES ($1) RETURNING id;'
				values: [name]
			@id

		rename: (name) ->
			query
				text: 'UPDATE asaplist SET name=$2 WHERE id=$1;'
				values: [@id, name]

		delete: ->
			query
				text: 'DELETE FROM asaplist WHERE id=$1;'
				values: [@id]

		@getByName: (name) =>
			answer = queryOne
				text: 'SELECT id FROM asaplist WHERE name=$1;'
				values: [name]
			new @ answer.id

		@getAll: ->
			queryMany
				text: 'SELECT id, name FROM asaplist;'
				values: []

	class SocialEntity extends Information

		create: ->
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

		size: ->
		getList: ->
			queryMany
				text: 'SELECT * FROM maybe ORDER BY last_edited;'
				values: []
	
	class Inbox extends ModelObject
		
		size: ->
			answer = queryOne
				text: 'SELECT count(*) FROM inbox;'
				value: []
			answer.count

		getFirst: ->
			queryOne
				text: 'SELECT id, type FROM inbox ORDER BY created_at LIMIT 1;'
				values: []
	
	class Urgent extends ModelObject

		size: ->
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
