{ModelObject} = require "basemodel"

notImplemented = () ->
	alert("This Function is not implemented!")

exports.connect = () ->

	infos = {}

	registerInfo = (info) ->
		infos[info.id] = info
		pushSubscriptions()

	pushSubscriptions = ->
		request =
			url: "information/update"
			type: "patch"
			dataType: "json"
			data:
				subscriptions: (id for id, info of infos)
		console.log "PATCH /information/update"
		$.ajax request


	unregisterInfo = (info) ->
		if info.id? and infos[info.id]?
			delete infos[info.id]
			pushSubscriptions()

	infocb = (event) ->
		values = JSON.parse event.data
		if infos[values.id]?
			infos[values.id]._set values

	inboxcb = -> inbox.change()

	getInformation = (id, callback) ->
		if infos[id]?
			if infos[id].__lock?
				infos[id].__lock.push callback
			else
				callback? null, infos[id]
		else
			infos[id] = {__lock: [callback]}
			await new Information(id).get defer error, values
			info = new (model.getClassByType values.type)(values.id)
			info._set values
			cb?(null, info) for cb in infos[id].__lock
			registerInfo info
	setTimeout (->
		source = new EventSource "/information/update"
		source.addEventListener "info", infocb, false
		source.addEventListener "inboxchange", inboxcb, false
		source.addEventListener "message", (event) -> console.log event.data), 1
		
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
				$.ajax request
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
			

		get: (callback) ->
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

		_url: -> "#{if @type? then @type else "information"}#{if @id? then "/#{@id}" else ""}"

		_set: (values) ->
			@values = values
			(@[key] = value) for key,value of values
			@change values

	class File extends PGObject
		create: (name) ->
		getName: ->
		delete: ->

	class Note extends Information
		create: (content, callback) ->
			await @_post
				content: content,
					defer error, {id: @id}
			registerInfo @
			callback? error, @id

		setContent: (content, callback) ->
			@_patch
				method: "setContent"
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
		getSize: ->
		getList: ->
	
	class Inbox extends PGObject
		getSize: (callback) ->
			await @_get {filter: "size"}, defer(error, {size: @size}), "inbox" unless @size?
			callback? error, @size

		getFirst: (callback) ->
			await @_get {filter: "first"}, defer(error, @first), "inbox" unless @first?
			if @first.first? then getInformation @first.first, callback else callback? error, null

		change: ->
			delete @first
			delete @size
			super()


	class Urgent extends PGObject
		 getSize: ->
		 getList: ->

	inbox = new Inbox
	maybe = new Maybe
	urgent = new Urgent
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
		inbox:inbox
		maybe:maybe
		urgent:urgent
		getInformation:getInformation
