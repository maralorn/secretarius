module.exports.connect = (connectionString) ->
	pg = require('pg').native

	query = (config) ->
		await pg.connect connectionString, defer client
		client.query config
		

	class PGObject
		constructor: (@id) ->

	class Information extends PGObject

		create: (status = 'default') ->
			request = query
				text: "INSERT INTO information (status) VALUES ($1) RETURNING id;"
				name: "createInformation"
				values: [status]
			await request.on 'row', defer answer
			@id = answer.id


	class File extends PGObject

	class Note extends Information

	class Task extends Information

	class Project extends Task

	class Asap extends Task

	class SocialEntity extends Information

	class Circle extends SocialEntity

	class Contact extends SocialEntity

	class Place extends Information

	class Appointment extends Information

	model =
		Information: Information
		Note: Note
