{ModelObject} = require "basemodel"

notImplemented = (errorcallback) ->
	alert("This Function is not implemented!")
	errorcallback?("This Function is not implemented!")

exports.connect = () ->
	class PGObject extends ModelObject
		constructor: (@id) ->

	class Information extends PGObject
		constructor: (@id) ->
			tempType = @constructor.name.toLowerCase()
			@type = tempType if tempType != "information"

		create: (status = "default", referencing=null, callback, errorcallback) ->
			notImplemented(errorcallback)

		addReference: (reference, callback, errorcallback) ->
			@_patch
				method: "addReference"
				reference: reference.id,
					callback, errorcallback
		removeReference: (reference, callback, errorcallback) ->
			@_patch
				method: "removeReference"
				reference: reference.id,
					callback, errorcallback
			
		delete: (callback, errorcallback) ->
			@_delete callback, errorcallback

		getType: (callback, errorcallback) ->
			unless @type?
				await @_get
					fields: ["type"],
						defer({type: @type}), errorcallback
			callback? @type
			

		get: (callback, errorcallback) ->
			await @getType defer()
			unless @values?
				await @_get null, defer(@values), errorcallback
				(@[key] = value) for key,value of @values
			callback? @values

		setStatus: (status, callback, errorcallback) ->
			@_patch
				method: "setStatus"
				status: status,
					callback, errorcallback

		setDelay: (delay, callback, errorcallback) ->
			@_patch
				method: "setDelay"
				delay: delay,
					callback, errocallback

		attach: (file, callback, errorcallback) ->
			@_patch
				method: "attach"
				file: file.id,
					callback, errorcallback

		detach: (file, callback, errorcallback) ->
			@_patch
				method: "detach"
				file: file.id,
					callback, errorcallback

		getReferences: (callback, errorcallback) ->
			@_get
				fields: "references",
					callback, errorcallback
				
		_get: (data, callback, errorcallback) ->
			@_call "get", "#{@id}", data, callback, errorcallback
		_put: (data, callback, errorcallback) ->
			@_call "put", "#{@id}", data, callback, errorcallback
		_delete: (callback, errorcallback) ->
			@_call "delete", "#{@id}", callback, errorcallback
		_patch: (data, callback, errorcallback) ->
			@_call "patch", "#{@id}", data, callback, errorcallback
		_post: (data) ->
			@_call "post", null, data, callback, errorcallback
		_call: (type, url, data, callback, errorcallback) ->
			url = "#{@type}#{if url? then "/#{url}" else ""}"
			request =
				url: url
				type: type
				success: callback
				dataType: "json"
			if data? then request.data = data
			console.log "#{type.toUpperCase()} #{url} (#{data})"
			$.ajax(request)

	class File extends PGObject
		create: (name) ->
		getName: ->
		delete: ->

	class Note extends Information
		create: (content, attachment=null) ->
			{id: @id} = @_post
				content: content
				attachment: if attachment? then attachment.id else null

		change: (content) ->
			@_patch
				method: "change"
				content: content

	class Task extends Information
		create: (description, referencing=null) ->
		done: ->
		undo: ->

	class Project extends Task
		create: (description, referencing=null, parent=null) ->
		setParent: (parent) ->
		collapse: ->
		uncollapse: ->
		@getAll: () ->

	class Asap extends Task
		create: (description, list, referencing=null, project=null) ->
		setProject: (project) ->
		setList: (list) ->
		@getAllFromList: (list) ->
		@getAll: () ->

	class AsapList extends PGObject
		create: (name) ->
		rename: (name) ->
		delete: ->
		@getByName: (name) =>
		@getAll: ->

	class SocialEntity extends Information
		create: ->
			
	class Circle extends SocialEntity
		create: (name) ->
		@getByName: (name) =>
		rename: (name) ->

	class Contact extends SocialEntity
		create: (nameMap) ->
		setValues: (nameMap) ->
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
	
	class Inbox extends ModelObject
		size: ->
		getFirst: (callback, errorcallback) ->
			callback new Note()

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
