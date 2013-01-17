http = require 'http'

require 'systemd'
express = require 'express'

iced = require './myiced'
pgmodel = require './models/pgmodel'
json = require './jsoninterface'
sse = require './sse'


debug = true
connectionString = "postgresql:///#{process.env.USER}-secretarius"

app = do express

if debug?
	app.use express.logger()

app.use express.compress()
app.use express.cookieParser()
app.use express.cookieSession
	secret: "secret-#{Math.random()}"
app.use express.bodyParser()

app.use (req, res, next) ->
	res.format
		_default: -> do next
		default: -> do next
		json: -> req.url = "/json#{req.url}"; next()
		html: -> req.url = '/index.html'; next()

app.use express.static "#{__dirname}/client"

app.use app.router

model = pgmodel connectionString
json app, model, debug
sse app, model, debug

app.use (req, res) ->
	obj = {error: 404, msg: 'not found'}
	_default = -> res.send 404, JSON.stringify obj
	res.format
		_default: _default
		default: _default
		json: -> res.json 404, obj
		html: ->	res.send 404, '<html><body><h1>404 - Not Found</h1></body></html>'

http.createServer(app).listen if process.env.LISTEN_PID > 0 then 'systemd' else 3000
