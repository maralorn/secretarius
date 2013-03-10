TIMEOUT = 119000

util = require('libsecretarius').util

module.exports = (app, model) ->
	sockets = 0
	class Socket
		constructor: (@req, @res) ->
			util.debug ++sockets, 'sockets attached. (++)'
			@clients = []
			@req.socket.setTimeout Infinity
			@res.writeHead 200,
				"Content-Type": "text/event-stream"
				"Cache-Control": "no-cache"
				"Connection": "keep-alive"
			do empty = =>
				if @res?
					@res.write ":\n"
					setTimeout empty, TIMEOUT
			@req.on "close", =>
				@res = null
				util.debug --sockets, 'sockets attached. (--)'
				for client in @clients
					client.deregisterSocket this

		addClient: (client) ->
			client.registerSocket this
			@clients.push client
			this

		send: (event) ->
			@res.write event

		lastId: ->
			@req.get "Last-Event-Id"
		

	class NotifyClient
		constructor: (@name) ->
			@sockets = []

		submit: (data) ->
			event = "event: #{@name}\ndata: #{data}\n\n"
			socket.send event for socket in @sockets
			
		registerSocket: (socket) ->
			@sockets.push socket

		deregisterSocket: (socket) ->
			@sockets = (sock for sock in @sockets when sock isnt socket)

	class SimpleNotifyClient extends NotifyClient
		constructor: (event, callback) ->
			super event
			model.listen event, (msg) => ((_) =>
				@submit callback _, msg.payload)()
				
	changedclient = new SimpleNotifyClient 'changed', (_, id) ->
		JSON.stringify new model.Information(id).get _

	newclient = new SimpleNotifyClient 'new', (_, id) -> id

	deletedclient = new SimpleNotifyClient 'deleted', (_, id) -> id

	inboxclient = new SimpleNotifyClient 'inbox', (_) ->
		JSON.stringify model.inbox.get _
	
	app.get '/sseupdate', (req, res) ->
		new Socket(req, res)
			.addClient(changedclient)
			.addClient(inboxclient)
			.addClient(newclient)
			.addClient(deletedclient)
