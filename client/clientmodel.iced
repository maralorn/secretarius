{ModelObject} = require "basemodel"

notImplemented = () ->
	alert("This Function is not implemented!")

exports.connect = () ->
	class PGObject extends ModelObject
		constructor: (@id) ->
				
		_get: (data, callback, url)->
			@_call "get", data, callback, url

		_put: (data, callback, url) ->
			@_call "put", data, callback, url
		
		_delete: (callback, url) ->
			@_call "delete", callback, url

		_patch: (data, callback, url) ->
			@_call "patch", data, callback, url

		_post: (data, callback, url) ->
			@_call "post", data, callback, url

		_call: (type, data, callback, url) ->
			await
				request =
					url: if url? then url else @_url()
					type: type
					success: defer answer
					dataType: "json"
				if data? then request.data = data
				console.log "#{type.toUpperCase()} #{request.url} (#{if data? then JSON.stringify data else ""})"
				$.ajax(request)
			callback? null, answer

	class Information extends PGObject
		constructor: (@id) ->
			tempType = @constructor.name.toLowerCase()
			@type = tempType if tempType != "information"

		create: (status = "default", referencing=null, callback) ->
			notImplemented()

		addReference: (reference, callback) ->
			@_patch
				method: "addReference"
				reference: reference.id,
					callback
		removeReference: (reference, callback) ->
			@_patch
				method: "removeReference"
				reference: reference.id,
					callback
			
		delete: (callback) ->
			@_delete callback

		getType: (callback) ->
			unless @type?
				await @_get
					filter: "type",
						defer error,{type: @type}
			callback? error, @type
			

		get: (callback, errorcallback) ->
			await @getType defer error
			callback? error if error?
			unless @values?
				await @_get null, defer error, values
				@_set values
			callback? error, @values

		setStatus: (status, callback) ->
			@_patch
				method: "setStatus"
				status: status,
					callback

		setDelay: (delay, callback) ->
			@_patch
				method: "setDelay"
				delay: delay,
					callback

		attach: (file, callback) ->
			@_patch
				method: "attach"
				file: file.id,
					callback

		detach: (file, callback) ->
			@_patch
				method: "detach"
				file: file.id,
					callback

		getReferences: (callback) ->
			@_get
				filter: "references",
					callback

		_url: -> "#{@type}#{if @id? then "/#{@id}" else ""}"

		_set: (values) ->
				@values = values
				(@[key] = value) for key,value of values

	class File extends PGObject
		create: (name) ->
		getName: ->
		delete: ->

	class Note extends Information
		create: (content, callback) ->
			await @_post
				content: content,
					defer error, {id: @id}
			callback? error, @id

		change: (content, callback) ->
			@_patch
				method: "change"
				content: content,
					callback

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
	
	class Maybe extends PGObject
		size: ->
		getList: ->
	
	class Inbox extends PGObject
		size: (callback) ->
			await @_get null, defer(error, answer), "inbox/size"
			callback? error, answer.size

		getFirst: (callback) ->
			await @_get null, defer(error, answer), "inbox/first"
			if answer.id?
				info = new Information
				info._set answer
			else
				info = null
			callback? error, info

	class Urgent extends PGObject
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
