KEEPMSGS = 500
TIMEOUT = 59000


exports.serve = (app, model) ->

	findGetter = (filter, object) ->
		string = "get#{if filter? then filter else ''}".toLowerCase()
		for name, getter of object
			return getter if name.toLowerCase() == string

	parse = (req, res) ->
		httpmethod = req.method
		type = req.param "type"
		id = req.param "id"
		return unless type?
		console.log "#{httpmethod} /#{type}#{if id? then "/#{id}" else ""}"
		object = new (model.getClassByType type)? id
		switch httpmethod.toLowerCase()
			when "get"
				filter = req.param "filter"
				method = findGetter filter, object
			when "post"
				method = object.create
			when "patch"
				method = object[req.body.method]
		args = []
		prep = (x, cb) -> cb null, if x? then x else {msg: "success"}
		prepOnPost = (id, cb) -> cb null, {id: id}
		switch method
			when model.Information.prototype.getType
				prep = (type, cb) -> cb null, {type: type}
			when model.Information.prototype.setStatus
				args.push req.body.status
			when model.Information.prototype.addReference
				args.push new (model.Information) req.body.reference
			when model.Information.prototype.setDelay
				args.push new Date(req.body.delay)
			when model.Note.prototype.create
				args.push req.body.content
				prep = prepOnPost
			when model.Inbox.prototype.getFirst
				prep = (info, cb) ->
					if info?
						cb null, {first: info.id}
					else
						cb null, {msg: "inbox is empty"}
			when model.Inbox.prototype.getSize
				prep = (size, cb) -> cb null, {size: size}
			when model.Information.prototype.get
				""
			else
				error = {msg: "method not found"}
		unless error?
			await
				args.push defer error, result
				method.apply object, args
		if error? and error.pgerror? and error.pgerror.code in ["23505"]
			error = null
		unless error?
			await prep result, defer error, answer
		unless error?
			res.send 200, answer
		else
			res.send 500, {msg: "Internal Error"}
			console.log error

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
			

		
	class NotifyClient
		constructor: ->
			@messageCount = 0
			@messages = {}
			@sockets = []

		submit: (data) ->
			@messageCount++
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
					
	changeclient = new SimpleNotifyClient "infochange", (msg, callback) ->
		await new model.Information(parseInt(msg)).get defer error, values
		if error? then console.log error; return
		callback null, JSON.stringify values

	inboxclient = new SimpleNotifyClient "inboxchange", (msg, callback) ->
		await new model.Inbox().get defer error, answer
		if error? then console.log error; return
		callback null, JSON.stringify
			size: answer.size
			first: answer.first.id

	app.get "/information/update", (req, res) ->
		new Socket req, res, changeclient

	app.get "/inbox/update", (req, res) ->
		new Socket req, res, inboxclient

	app.all "/:type/:id", parse
	app.all "/:type", parse
