iced = require './myiced'
iced.util.pollute global

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

		findObject: func (autocb, req) ->
			type = req.params.type
			cls = model.getClassByType type
			id = req.params.id
			if type in ['inbox', 'urgent', 'maybe']
				model[type]
			else if cls?
				if model.UUID_REG.test id
					await model.cache.getInformation defer(info), id
					info
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

		parse: (req, res, next) =>
			return next() unless req.accepts("json")?
	
			debug req.method, req.url, req.query, req.body
			respond = (code, msg) ->
				res.json code, msg

			abort = (error) ->
				respond 500,
					msg: "Internal Error"
					error: error
				debug error
			
			await @findObject defer(error, object), req
			return abort error if error?
			return do next if object is null
			method = @findMethod req, object
			return abort error if error?
			handler = null
			for handlerobj in @methods
				if handlerobj.method is method
					handler = handlerobj
			return do next unless handler?
			if handler.before?
				await handler.before defer(error, args), req
				return abort error if error?
			await
				params = [defer(error, result)]
				params = params.concat args if args?
				method.apply object, params
			if handler.catcher? and error?
				error = handler.catcher error
			return abort error if error?
			if handler.after?
				await handler.after defer(error, result), result
				return abort error if error?
			respond 200, result or {msg: "success"}
			
	parser = new Parser

	afterOnPost = (cb, ans) -> cb null, {id: ans}

	pgCode = (code) ->
		(error) -> unless error.msg is 'pgerror' and error.pgerror.code is code then error else null

	parser.registerMethods
		after: func (autocb, ans) -> type: ans
		method: model.Information::getType,

			before: func (autocb, req) -> [req.body.status]
			method: model.Information::setStatus,

		before: ref = func (autocb, req)	->
			await model.cache.getInformation defer(reference), req.body.reference
			[reference]
		catcher: pgCode '23505'
		method: model.Information::addReference,

			before: ref
			method: model.Information::removeReference,

		before: (cb, req) -> cb null, [if req.body.delay isnt '' then new Date req.body.delay else null]
		method: model.Information::setDelay,

			before: con = func (autocb, req) -> [req.body.content]
			after: afterOnPost
			method: model.Note::create,

		before: con
		method: model.Note::setContent,

			after: (cb, ans) -> cb null, if ans? then {first: ans.id} else {msg: "inbox is empty"}
			method: model.inbox.getFirst,

		after: (cb, ans) -> cb null, {size: ans}
		method: model.inbox.getSize,

			after: (cb, ans) -> cb null, {size: ans.size, first: ans.first?.id}
			method: model.inbox.get,

		method: model.Information::get,

			before: func (autocb, req) ->
				await
					model.cache.getInformation defer(referencing), req.body.referencing
					model.cache.getInformation defer(parent), req.body.parent
				[req.body.description, referencing, parent]
			after: afterOnPost
			method: model.Project::create,


		before: func (autocb, req) ->
			await model.cache.getInformation defer(parent), req.body.parent
			[parent]
		method: model.Project::setParent,

			method: model.Project::collapse,

		method: model.Project::uncollapse,
	
			method: model.Project.getAll,

		method: model.Project.getActive,
	
			before: func (autocb, req) ->
				await
					model.cache.getInformation defer(list), req.body.list
					model.cache.getInformation defer(referencing), req.body.referencing
					model.cache.getInformation defer(project), req.body.project
				[req.body.description, list, referencing, project]
			after: afterOnPost
			method: model.Asap::create,

		before: func (autocb, req) ->
			await model.cache.getInformation defer(project), req.body.project
			[project]
		method: model.Asap::setProject,

			before: listfn = func (autocb, req) ->
				await model.cache.getInformation defer(list), req.body.list
				[list]
			method: model.Asap::setList,

		method: model.Asap.getAll,

			method: model.Asap.getActive,

		before: listfn
		method: model.Asap.getActiveFromList,

			method: model.AsapList.getAll,

		before: name = func (autocb, req) ->
			debug req.body.name
			[req.body.name]
		method: model.AsapList::create,

			before: name
			method: model.AsapList::rename
	
	app.all "/json/:type/:id", parser.parse
	app.all "/json/:type", parser.parse
