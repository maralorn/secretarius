KEEPMSGS = 500
TIMEOUT = 59000


exports.serve = (app, model, debug) ->
	class Socket
		constructor: (@req, @res, @client) ->
			@res.connection.setTimeout 0
			@res.writeHead 200,
				"Content-Type": "text/event-stream"
				"Cache-Control": "no-cache"
				"Connection": "keep-alive"
			(empty = =>
				if @res?
					@res.write "\n"
					setTimeout empty, TIMEOUT
			)()
			@client.registerSocket @
			@req.on "close", =>
				@res = null
				@client.deregisterSocket @

		send: (event) ->
			@res.write event

		lastId: ->
			@req.get "Last-Event-Id"
		

	class NotifyClient
		constructor: ->
			@messageCount = 0
			@messages = {}
			@sockets = []

		submit: (data) ->
			@mesageCount++
			@messages[@messageCount] = event = "id: #{@messageCount}\ndata: #{data}\n\n"
			socket.send event for socket in @sockets
			if @messageCount > KEEPMSGS
				delete @messages[@messageCount-KEEPMSGS]?
			
		registerSocket: (socket) ->
			if (message = socket.lastId)? and message of @messages
				while message <= @messageCount
					socket.send @messages[message++]
			@sockets.push socket

		deregisterSocket: (socket) ->
			@sockets = (sock for sock in @sockets when sock isnt socket)


	class SimpleNotifyClient extends NotifyClient
		constructor: (event, callback) ->
			super()
			model.listen event, (error, msg) =>
				if error? then console.log error; return
				await callback msg.payload, defer error, data
				if error? then console.log error; return
				@submit data


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
			if type in ["inbox", "urgent", "maybe"]
				cb null, model[type]
			else if (id = req.params.id)?
				model.cache.getInformation cb, id
			else if (cls = model.getClassByType type)? and req.method == "POST"
				cb null, new cls
			else
				cb
					msg: "No object found"
					type: type
					id: id

		findMethod: (req, object) ->
			switch req.method
				when "GET"
					@findGetter req.query.filter, object
				when "POST"
					object.create
				when "PATCH"
					object[req.body.method]

		parse: (req, res) =>
			num = Math.floor Math.random() * 1000
			console.log "#{num}:\t#{req.method}\t#{req.url}\tquery:#{JSON.stringify req.query}\tbody:#{JSON.stringify req.body} {"
			respond = (code, msg) ->
				res.send code, msg
				console.log "#{num}:\t#{code}\t#{JSON.stringify msg} }"
			abort = (error) ->
				respond 500, {msg: "Internal Error", error: error}
			await @findObject defer(error, object), req
			if error? then abort error; return
			method = @findMethod req, object
			if error? then abort error; return
			handler = @methods[method]
			unless handler? then abort {msg: "method not found", method: method}; return
			if handler.before?
				await handler.before defer(error, args), req
				if error? then abort error; return
			await
				params = [defer(error, result)]
				params = params.concat args if args?
				method.apply object, params
			if error? then abort error; return
			if handler.after?
				await handler.after defer(error, result), result
				if error? then abort error; return
			respond 200, if result? then result else {msg: "success"}

#			if error? and error.pgerror? and error.pgerror.code in ["23505"]
#				error = null
			
				
	changeclient = new SimpleNotifyClient "infochange", (msg, callback) ->
		await model.cache.getInformation defer(error, info), msg
		if error? then console.log error; return
		await info.get defer error, values
		if error? then console.log error; return
		callback null, JSON.stringify values

	inboxclient = new SimpleNotifyClient "inboxchange", (msg, callback) ->
		await model.inbox.get defer error, answer
		if error? then console.log error; return
		console.log "inbox:", JSON.stringify answer
		callback null, JSON.stringify
			size: answer.size
			first: if answer.first? then answer.first.id else null

	app.get "/information/update", (req, res) ->
		new Socket req, res, changeclient

	app.get "/inbox/update", (req, res) ->
		new Socket req, res, inboxclient
	
	parser = new Parser

	afterOnPost = (cb, ans) -> cb null, {id: ans}

	parser.registerMethod model.Information.prototype.getType,
		after: (cb, ans) -> cb null, {type: ans}

	parser.registerMethod model.Information.prototype.setStatus,
		before: (cb, req) -> cb null, [req.body.status]

	parser.registerMethod model.Information.prototype.addReference,
		before: (cb, req)	->	cb null, [model.cache.getInformation req.body.reference]

	parser.registerMethod model.Information.prototype.setDelay,
		before: (cb, req) -> cb null, [new Date(req.body.delay)]

	parser.registerMethod model.Note.prototype.create,
		before: (cb, req) -> cb null, [req.body.content]
		after: afterOnPost
		
	parser.registerMethod model.inbox.getFirst,
		after: (cb, ans) -> cb null, if res? then {first: res.id} else {msg: "inbox is empty"}

	parser.registerMethod model.inbox.getSize,
		after: (cb, ans) -> cb null, {size: ans}
		
	parser.registerMethod model.inbox.get,
		after: (cb, ans) -> cb null, {size: ans.size, first: ans.first?.id}
		
	parser.registerMethod model.Information.prototype.get, {}

	app.all "/:type/:id", parser.parse
	app.all "/:type", parser.parse
