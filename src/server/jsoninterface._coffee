util = require('libsecretarius').util

module.exports = (app, model) ->
	class Parser
		constructor: ->
			@methods = []

		findGetter: (filter, object) ->
			string = "get#{if filter? then filter else ''}".toLowerCase()
			for name, getter of object
				return getter if name.toLowerCase() is string

# before: (cb, args, req) ->
# after: (cb, result) ->

		registerMethods: (list...) ->
			@methods = @methods.concat list

		findObject: (req) ->
			type = req.params.type
			cls = util.findElement type, model
			id = req.params.id
			if type in ['inbox', 'urgent', 'maybe']
				model[type]
			else if cls?
				if model.UUID_REG.test id
					new cls id
				else if req.method == "POST"
					new cls
				else
					cls
			else
				null

		findMethod: (req, object) ->
			switch req.method
				when "GET"
					@findGetter req.query.filter, object
				when "POST"
					object.create
				when "PATCH"
					object[req.body.method]

		parse: (req, res, next) => ((_) =>
			util.debug req.method, req.url, req.query, req.body
			try
				object = @findObject req
				return do next if object is null
				method = @findMethod req, object
				handler = null
				for handlerobj in @methods
					if handlerobj.method is method
						handler = handlerobj
				return do next unless handler?
				if handler.before?
					args = handler.before(_, req) or []
				try
					((cb) -> method.apply object, [cb].concat args) _
				catch error
					if handler.catcher?
						handler.catcher error
					else
						throw error
				if handler.after?
					result = handler.after _, result
				res.json 200, if result? then result else {msg: "success"}
			catch error
				res.json code,
					msg: "Internal Error"
					error: error
				util.debug error)(->)
			
	parser = new Parser

	afterOnPost = (_, ans) -> id: ans

	pgCode = (code) ->
		(error) -> throw error unless error.code? and error.pgerror.code is code

	parser.registerMethods
		after: (_, ans) -> type: ans
		method: model.Information::getType,

			before: (_, req) -> [req.body.status]
			method: model.Information::setStatus,

		before: ref = (_, req)	-> [req.body.reference]
		catcher: pgCode '23505'
		method: model.Information::addReference,

			before: ref
			method: model.Information::removeReference,

		before: (_, req) -> [if req.body.delay isnt '' then new Date req.body.delay else null]
		method: model.Information::setDelay,

			method: model.Information.getAllIDs,

		method: model.Information.getAll,

			before: con = (_, req) -> [req.body.content]
			after: afterOnPost
			method: model.Note::create,

		before: con
		method: model.Note::setContent,

			method: model.inbox.get,

		method: model.Information::get,

			method: model.Task::done,

		method: model.Task::undo,

			before: (_, req) -> [req.body.description, req.body.referencing, req.body.parent]
			after: afterOnPost
			method: model.Project::create,
			
		before: (_, req) -> [if req.body.deadline isnt '' then new Date req.body.deadline else null]
		method: model.Task::setDeadline,

			before: (_, req) -> [req.body.description]
			method: model.Task::setDescription,

		before: (_, req) -> [req.body.parent]
		method: model.Project::setParent,

			method: model.Project::collapse,

		method: model.Project::uncollapse,
	
			before: (_, req) -> [req.body.description, req.body.list, req.body.referencing, req.body.project]
			after: afterOnPost
			method: model.Asap::create,

		before: (_, req) -> [req.body.project]
		method: model.Asap::setProject,

			before: listfn = (_, req) -> [req.body.list]
			method: model.Asap::setList,

		before: name = (_, req) -> [req.body.name]
		method: model.AsapList::create,

			before: name
			method: model.AsapList::rename

	app.all "/json/:type/:id", parser.parse
	app.all "/json/:type", parser.parse
