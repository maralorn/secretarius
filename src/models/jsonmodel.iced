module.exports = model = require "basemodel"

updatecb = (event) ->
	console.log event
	switch event.data.name
		when 'info'
			model.cache.storeInfo event.data.data
		when 'inbox'
			model.inbox._store (-> return), event.data.data

port = new SharedWorker('worker.js').port
port.addEventListener 'message', updatecb, false
do port.start
	
class PGObject extends model.ModelObject
	constructor: (@id) ->
			
	_get: (cb, data, url)->
		@_call cb, "get", data, url

	_put: (cb, data, url) ->
		@_call cb, "put", data, url
	
	_delete: (cb, url) ->
		@_call cb, "delete", url

	_patch: (cb, data, url) ->
		@_call cb, "patch", data, url

	_post: (cb, data, url) ->
		@_call cb, "post", data, url

	_call: (cb, type, data, url) ->
		await
			request =
				url: if url? then url else @_url()
				type: type
				success: defer answer
				dataType: "json"
			if data? then request.data = data
			console.log "#{type.toUpperCase()} #{request.url} (#{if data? then JSON.stringify data else ""})"
			$.ajax request
		cb null, answer


class Information extends PGObject
	constructor: (@id) ->
		tempType = @constructor.name.toLowerCase()
		@type = tempType if tempType != "information"

	_create: (cb, args) ->
		await @_post defer(error, ans), args
		if error? then cb error; return
		cb null, @id = ans.id
		model.cache.registerInfo @

	addReference: (cb, reference) ->
		@_patch cb,
			method: "addReference"
			reference: reference.id

	removeReference: (cb, reference) ->
		@_patch cb,
			method: "removeReference"
			reference: reference.id
		
	delete: (cb) ->
		@_delete cb

	getType: (cb) ->
		unless @type?
			await @_get cb,
				filter: "type",
					defer error, {type: @type}
		cb error, @type

	get: (cb) ->
		unless @values?
			await @_get defer(error, values)
			if error? then cb error; return
			@_store values
		cb null, @values

	setStatus: (cb, status) ->
		@_patch cb,
			method: "setStatus"
			status: status

	setDelay: (cb, delay) ->
		@_patch cb,
			method: "setDelay"
			delay: delay

	attach: (cb, file) ->
		@_patch cb,
			method: "attach"
			file: file.id

	detach: (cb, file) ->
		@_patch cb,
			method: "detach"
			file: file.id

	getReferences: (cb) ->
		@_get cb,
			filter: "references"

	_url: -> "#{if @type? then @type else "information"}#{if @id? then "/#{@id}" else ""}"

	_store: (values) ->
		@values = values
		(@[key] = value) for key,value of values
		@change values

class File extends PGObject
	create: (name) ->
	getName: ->
	delete: ->

class Note extends Information
	create: (cb, content) ->
		@_create cb,
			content: content,

	setContent: (cb, content) ->
		@_patch cb,
			method: "setContent"
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

class Maybe extends PGObject
	getSize: ->
	getList: ->

class Inbox extends PGObject
	getSize: (cb) ->
		unless @values?
			await @get defer(error)
			if error? then cb error; return
		cb null, @values.size

	getFirst: (cb) ->
		unless @values?
			await @get defer(error)
			if error? then cb error; return
		cb null, @values.first

	get: (cb) ->
		unless @values?
			await @_get defer(error, res), null, "inbox"
			if error? then cb error; return
			await @_store defer(error), res
			if error? then cb error; return
		cb null, @values

	_store: (cb, @values) ->
		if @values.first? then await model.cache.getInformation defer(error, @values.first), @values.first
		if error? then cb error; return
		@change @values
		cb()


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
