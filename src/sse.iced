KEEPMSGS = 500
TIMEOUT = 59000

iced = require './myiced'
iced.pollute global

module.exports = (app, model, debug) ->
	class Socket
		constructor: (@req, @res, @client) ->
			@req.socket.setTimeout Infinity
			@res.writeHead 200,
				"Content-Type": "text/event-stream"
				"Cache-Control": "no-cache"
				"Connection": "keep-alive"
#			do empty = =>
#				if @res?
#					@res.write "\n"
#					setTimeout empty, TIMEOUT
			@client.registerSocket this
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
			@sockets = (sock for sock in @sockets when sock isnt socket)
			console.log @sockets.length, 'sockets attached. (++)' if debug
			if (message = socket.lastId)? and message of @messages
				while message <= @messageCount
					socket.send @messages[message++]
			@sockets.push socket

		deregisterSocket: (socket) ->
			@sockets = (sock for sock in @sockets when sock isnt socket)
			console.log @sockets.length, 'sockets attached. (--)' if debug

	class SimpleNotifyClient extends NotifyClient
		constructor: (event, callback) ->
			super
			model.listen event, (error, msg) =>
				if error? then console.log error; return
				await callback msg.payload, defer error, data
				if error? then console.log error; return
				@submit data
				
	changeclient = new SimpleNotifyClient "infochange", f (autocb, msg) ->
		await model.cache.getInformation c defer(info), msg
		await info.get c defer values
		JSON.stringify values

	inboxclient = new SimpleNotifyClient "inboxchange", f (autocb, msg) ->
		await model.inbox.get c defer answer
		JSON.stringify
			size: answer.size
			first: answer.first?.id
	
	app.get "/information/update", (req, res) ->
		new Socket req, res, changeclient

	app.get "/inbox/update", (req, res) ->
		new Socket req, res, inboxclient
