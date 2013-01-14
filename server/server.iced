connectionString = "postgresql:///#{process.env.USER}-secretarius"
debug = true

app = (express = require "express")()
app.use express.compress()
app.use express.cookieParser()
app.use express.cookieSession
	secret: "secret-#{Math.random()}"
app.use express.bodyParser()
app.use (req, res, next) ->
	res.format
		_default: -> next()
		default: => @_default()
		json: -> req.url = "/json#{req.url}"; next()
		html: -> req.url = "/html#{req.url}"; next()
app.use app.router

require("../browserui/server").serve app, debug
require("../jsoninterface/server").serve app, require("../models/pgmodel").connect(connectionString), debug

app.use (req, res) ->
	obj = {error: 404, msg: "not found"}
	res.format
		_default: -> res.send 404, JSON.stringify obj
		default: => @_default()
		json: -> res.json 404, obj
		html: ->	res.send 404, "<html><body><h1>404 - Not Found</h1></body></html>"

require "systemd"
require("http").createServer(app).listen if process.env.LISTEN_PID > 0 then "systemd" else 3000
