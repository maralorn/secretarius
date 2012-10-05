hash = do ->
	crypto = require 'crypto'
	(key) -> crypto.createHash('md5').update(key).digest 'base64'

module.exports.connect = (connectionString) ->
	pg = require('pg').native

	query = (config) ->
		config.name = hash config.text
		await pg.connect connectionString, defer client
		request = client.query config
		request.on 'error', (error) -> console.log error
		request
	
	queryMany = (config) ->
		if config.callback?
			cb = config.callback
			delete config.callback
		else
			cb = (row, result) -> result.addRow(row)
		request = query config
		request.on 'row', cb
		await request.on 'end', defer result
		result.rows
		
	queryOne = (config) ->
		queryMany(config)[0]


	class PGObject
		constructor: (@id) ->


	class Information extends PGObject

		constructor: (@id) ->
			tempType = @constructor.name.toLowerCase()
			@type = tempType if tempType != 'information'
			
		create: (status = 'default', referencing=null) ->
			{id: @id} = queryOne
				text: 'INSERT INTO information (status) VALUES ($1) RETURNING id;'
				values: [status]
			@addReference referencing if referencing?
			@id

		addReference: (id) ->
			query
				text: 'INSERT INTO "references" (id, referenceid) VALUES ($1, $2);'
				values: [@id, id]

		removeReference: (referencid) ->
			query
				text: 'DELETE FROM references WHERE id=$1 AND referenceid=$2'
				values: [@id, referenceid]

		delete: ->
			query
				text: 'DELETE FROM information WHERE id=$1;'
				values: [@id]

		getType: ->
			{type: @type} = queryOne
				text: 'SELECT type FROM type WHERE id=$1;'
				values: [@id]

		get: ->
			@getType() unless @type?
			answer = queryOne
				text: 'SELECT * FROM #{@type}view WHERE id=$1;'
				values: [@id]
			(@[key] = value) for key,value of answer
			answer

		setStatus: (status) ->
			query
				text: 'UPDATE information SET status=$2 WHERE id=$1;'
				values: [@id, status]

		setDelay: (delay) ->
			query
				text: 'UPDATE information SET status="inbox", delay=$2 WHERE id=$1;'
				values: [@id, delay]


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

		create: (content, attachment=null) ->
			super()
			queryOne
				text: 'INSERT INTO note (id, content, attachment) VALUES ($1, $2, $3);'
				values: [@id, content, attachment]
			@id

		addAttachment: (attachment) ->
			query
				text: 'UPDATE note SET attachment=$2 WHERE id=$1;'
				values: [@id, attachment]

		change: (content) ->
			query
				text: 'UPDATE note SET content=$2 WHERE id=$1'
				values: [@id, content]

		removeAttachment: ->
			query
				text: 'UPDATE note SET attachment=NULL WHERE id=$1'
				values: [@id]


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
				values: [@id, parent]

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

	class Circle extends SocialEntity

	class Contact extends SocialEntity

	class Place extends Information

	class Appointment extends Information

		create: (description, date, time=null, length=null, referencing=null) ->
			super 'default', referencing
			queryOne
				text: 'INSERT INTO appointment (id, description, date, time, length) VALUES ($1, $2, $3, $4, $5);'
				values: [@id, description, date, time, length]
			@id
	
	class Maybe

		@getList: ->
			queryMany
				text: 'SELECT * FROM maybe ORDER BY last_edited;'
				values: []
	
	class Inbox
		
		@size: ->
			answer = queryOne
				text: 'SELECT count(*) FROM inbox;'
				value: []
			answer.count

		@urgentCount: ->
			answer = queryOne
				text: 'SELECT count(*) FROM inbox WHERE status=urgent'
				value: []
			answer.count

		@getFirst: ->
			queryOne
				text: 'SELECT id, type FROM inbox ORDER BY created_at LIMIT 1;'
				values: []

	model =
		Information: Information
		Note: Note
		Asap: Asap
