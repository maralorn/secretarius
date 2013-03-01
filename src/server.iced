module.exports = (model) ->
	http = require 'http'

	require 'systemd'
	express = require 'express'

	json = require './jsoninterface'
	sse = require './sse'


	app = do express

	app.use (req, res, next) ->
		for i in req.accepted
			switch i.subtype
				when 'json' then req.url = "/json#{req.url}"
				when 'html'	then req.url = '/index.html'
		do next

	app.use express.compress()
	app.use express.static "#{__dirname}/client"
	app.use express.cookieParser()
	app.use express.cookieSession
		secret: "secret-#{Math.random()}"
	app.use express.bodyParser()



	app.use app.router

	json app, model
	sse app, model

	app.use (req, res) ->
		obj = {error: 404, msg: 'not found'}
		_default = -> res.send 404, JSON.stringify obj
		res.format
			_default: _default
			default: _default
			json: -> res.json 404, obj
			html: ->	res.send 404, '<html><body><h1>404 - Not Found</h1></body></html>'

	http.createServer(app).listen if process.env.LISTEN_PID > 0 then 'systemd' else 3000
