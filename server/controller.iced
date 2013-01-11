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
		
	clients = {}

	class NotifyClient
		constructor: ->
			@messageCount = 0
			@id = Math.floor(Math.random() * 1000000000000000)
			clients[@id] = @
			@subscriptions = []

		registerSocket: (req, res) ->
			#req.socket.setTimeout Infinity
			res.connection.setTimeout 0
			@res = res
#			@res.cookie "notifyid", "#{@id}",
#				maxAge: 86400000
#				path: "/information/update"
			@res.writeHead 200,
				"Content-Type": "text/event-stream"
#				"Cache-Control": "no-cache"
#				"Connection": "keep-alive"
			(empty = =>
				if @res?
					@res.write "data: Keepalive!\n\n"
					setTimeout empty, 2000
			)()
			req.on "close", =>
				@res = null

		refresh: ->
			@timeout = new Date()
			@timeout.setMinutes @timeout.getMinutes() + 10

		inboxUpdate: ->
			console.log "inboxupdate"
			if @res?
				@res.write "id: #{@messageCount++}\n"
				@res.write "data: change\n"
				@res.write "event: inboxchange\n\n"

		wantsUpdate: (id) ->
			if @res?
				@refresh()
			if @timeout < new Date()
				delete clients[@id]
			else if "#{id}" in @subscriptions and @res?
				return true
			return false

		send: (values) ->
#			@res.write "id: #{@messageCount++}\n"
			@res.write "data: #{values}\n"
#			@res.write "event: info\n\n"

		setSubscriptions: (@subscriptions) ->
		pushSubscription: (subscription) ->
			@subscription.push "#{subscription}"


	changecb = (error, msg) ->
		infoid = parseInt msg.payload
		uclients = []
		for id, client of clients
			uclients.push client if client.wantsUpdate infoid
		if uclients.length > 0
			await new model.Information(infoid).get defer error, values
			client.send JSON.stringify values for client in uclients

	inboxcb = (error, msg) ->
		for id, client of clients
			client.inboxUpdate()
		
	model.listen "infochange", changecb
	model.listen "inboxchange", inboxcb
		
	app.get "/information/update", (req, res) ->
		if clients[id = req.cookies.notifyid]?
			client = clients[id]
		else
			client = new NotifyClient
			clients[client.id] = client
		client.registerSocket req, res

	app.patch "/information/update", (req, res) ->
		clients[req.cookies.notifyid]?.setSubscriptions req.body.subscriptions if req.cookies.notifyid
		res.send 200

	app.all "/:type/:id", parse
	app.all "/:type", parse
