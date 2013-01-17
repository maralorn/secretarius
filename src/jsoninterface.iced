module.exports = (app, model, debug) ->

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

		findObject: (cb, req) ->
			type = req.params.type
			cls = model.getClassByType type
			if type in ["inbox", "urgent", "maybe"]
				cb null, model[type]
			else if cls? and (id = req.params.id)?
				model.cache.getInformation cb, id
			else if cls? and req.method == "POST"
				cb null, new cls
			else
				cb 0

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
	
			if debug
				num = Math.floor Math.random() * 1000
				console.log "#{num}:\t#{req.method}\t#{req.url}\tquery:#{JSON.stringify req.query}\tbody:#{JSON.stringify req.body} {"

			respond = (code, msg) ->
				res.json code, msg
				console.log "#{num}:\t#{code}\t#{JSON.stringify msg} }" if debug

			abort = (error) ->
					respond 500,
					msg: "Internal Error"
					error: error
			
			await @findObject defer(error, object), req
			return next() if error is 0
			return abort error if error?
			method = @findMethod req, object
			return abort error if error?
			handler = @methods[method]
			return next() unless handler?
			if handler.before?
				await handler.before defer(error, args), req
				return abort error if error?
			await
				params = [defer(error, result)]
				params = params.concat args if args?
				method.apply object, params
			return abort error if error?
			if handler.after?
				await handler.after defer(error, result), result
				return abort error if error?
			respond 200, if result? then result else {msg: "success"}
			
	parser = new Parser

	afterOnPost = (cb, ans) -> cb null, {id: ans}

	parser.registerMethod model.Information.prototype.getType,
		after: (cb, ans) -> cb null, {type: ans}

	parser.registerMethod model.Information.prototype.setStatus,
		before: (cb, req) -> cb null, [req.body.status]

	parser.registerMethod model.Information.prototype.addReference,
		before: (cb, req)	->
			await model.cache.getInformation defer(error, reference), req.body.reference
			cb error, [reference]

	parser.registerMethod model.Information.prototype.setDelay,
		before: (cb, req) -> cb null, [new Date(req.body.delay)]

	parser.registerMethod model.Note.prototype.create,
		before: (cb, req) -> cb null, [req.body.content]
		after: afterOnPost
		
	parser.registerMethod model.inbox.getFirst,
		after: (cb, ans) -> cb null, if ans? then {first: ans.id} else {msg: "inbox is empty"}

	parser.registerMethod model.inbox.getSize,
		after: (cb, ans) -> cb null, {size: ans}
		
	parser.registerMethod model.inbox.get,
		after: (cb, ans) -> cb null, {size: ans.size, first: ans.first?.id}
		
	parser.registerMethod model.Information.prototype.get, {}

	app.all "/json/:type/:id", parser.parse
	app.all "/json/:type", parser.parse
