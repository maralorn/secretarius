KEEPMSGS = 500
TIMEOUT = 119000

iced = require './myiced'
iced.util.pollute global

module.exports = (app, model, debug) ->
	sockets = 0
	class Socket
		constructor: (@req, @res) ->
			d ++sockets, 'sockets attached. (++)'
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
				d --sockets, 'sockets attached. (--)'
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
			@messageCount = 0
			@messages = {}
			@sockets = []

		submit: (data) ->
			@messageCount++
			@messages[@messageCount] = event = "event: #{@name}\nid: #{@messageCount}\ndata: #{data}\n\n"
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
			super event
			model.listen event, (error, msg) =>
				if error? then d error; return
				await callback defer(error, data), msg.payload
				if error? then d error; return
				@submit data
				
	changeclient = new SimpleNotifyClient "infochange", func (autocb, msg) ->
		await model.cache.getInformation defer(info), msg
		await info.get defer values
		JSON.stringify values

	inboxclient = new SimpleNotifyClient "inboxchange", func (autocb, msg) ->
		await model.inbox.get defer answer
		JSON.stringify
			size: answer.size
			first: answer.first?.id
	
	app.get "/sseupdate", (req, res) ->
		new Socket(req, res)
			.addClient(changeclient)
			.addClient(inboxclient)
