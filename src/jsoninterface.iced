iced = require './myiced'
iced.util.pollute global

UUID = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/

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
				if UUID.test id
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

	parser.registerMethods {
		method: model.Information::getType
		after: func (autocb, ans) -> type: ans
	},{
		method: model.Information::setStatus
		before: func (autocb, req) -> [req.body.status]
	},{
		method: model.Information::addReference
		before: ref = func (autocb, req)	->
			await model.cache.getInformation defer(reference), req.body.reference
			[reference]
		catcher: pgCode '23505'
	},{
		method: model.Information::removeReference
		before: ref
	},{
		method: model.Information::setDelay,
		before: (cb, req) -> cb null, [if req.body.delay isnt '' then new Date req.body.delay else null]
	},{
		method: model.Note::create
		before: con = func (autocb, req) -> [req.body.content]
		after: afterOnPost
	},{
		method: model.Note::setContent
		before: con
	},{
		method: model.inbox.getFirst
		after: (cb, ans) -> cb null, if ans? then {first: ans.id} else {msg: "inbox is empty"}
	},{
		method: model.inbox.getSize
		after: (cb, ans) -> cb null, {size: ans}
	},{
		method: model.inbox.get
		after: (cb, ans) -> cb null, {size: ans.size, first: ans.first?.id}
	},{
		method: model.Information::get
	},{
		method: model.AsapList.getAll
	},{
		method: model.AsapList::create
		before: name = func (autocb, req) ->
			debug req.body.name
			[req.body.name]
	},{
		method: model.AsapList::rename
		before: name
	}

	app.all "/json/:type/:id", parser.parse
	app.all "/json/:type", parser.parse
