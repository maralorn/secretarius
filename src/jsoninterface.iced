iced = require './myiced'
iced.util.pollute global

module.exports = (app, model) ->
	class Parser
		constructor: ->
			@methods = {}

		findGetter: (filter, object) ->
			string = "get#{if filter? then filter else ''}".toLowerCase()
			for name, getter of object
				return getter if name.toLowerCase() == string

# before: (cb, args, req) ->
# after: (cb, result) ->

		registerMethod: (method, handler) ->
			@methods[method] = handler
			
		registerMethods: (tree) ->
			for method, handler of tree
				registerMethod method, handler

		findObject: func (autocb, req) ->
			type = req.params.type
			cls = model.getClassByType type
			if type in ['inbox', 'urgent', 'maybe']
				model[type]
			else if cls? and (id = req.params.id)?
				await model.cache.getInformation defer(info), id
				info
			else if cls? and req.method == "POST"
				new cls
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
			handler = @methods[method]
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

	parser.registerMethod model.Information.prototype.getType,
		after: (cb, ans) -> cb null, {type: ans}

	parser.registerMethod model.Information.prototype.setStatus,
		before: func (autocb, req) -> [req.body.status]

	parser.registerMethod model.Information.prototype.addReference,
		before: ref = func (autocb, req)	->
			await model.cache.getInformation defer(reference), req.body.reference
			[reference]
		catcher: (error) -> unless error.msg is 'pgerror' and error.pgerror.code is '23505' then error else null

	parser.registerMethod model.Information.prototype.removeReference,
		before: ref

	parser.registerMethod model.Information.prototype.setDelay,
		before: (cb, req) -> cb null, [if req.body.delay isnt '' then new Date req.body.delay else null]

	parser.registerMethod model.Note.prototype.create,
		before: con = func (autocb, req) -> [req.body.content]
		after: afterOnPost
	
	parser.registerMethod model.Note.prototype.setContent,
		before: con
		
	parser.registerMethod model.inbox.getFirst,
		after: (cb, ans) -> cb null, if ans? then {first: ans.id} else {msg: "inbox is empty"}

	parser.registerMethod model.inbox.getSize,
		after: (cb, ans) -> cb null, {size: ans}
		
	parser.registerMethod model.inbox.get,
		after: (cb, ans) -> cb null, {size: ans.size, first: ans.first?.id}
		
	parser.registerMethod model.Information.prototype.get, {}

	app.all "/json/:type/:id", parser.parse
	app.all "/json/:type", parser.parse
