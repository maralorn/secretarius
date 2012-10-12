	class PGObject extends ModelObject
		constructor: (@id) ->

	class Information extends PGObject
		constructor: (@id) ->
		create: (status = 'default', referencing=null) ->
		addReference: (reference) ->
		removeReference: (reference) ->
		delete: ->
		getType: ->
		get: ->
		setStatus: (status) ->
		setDelay: (delay) ->
		attach: (file) ->
		detach: (file) ->
		_set: (table, map, allowed) ->
		getReferences: ->


	class File extends PGObject
		create: (name) ->
		getName: ->
		delete: ->

	class Note extends Information
		create: (content, attachment=null) ->
		change: (content) ->

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
		getFirst: ->

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
