http = require 'http'

require 'systemd'
express = require 'express'

iced = require './myiced'
iced.util.pollute global
pgmodel = require './models/pgmodel'
json = require './jsoninterface'
sse = require './sse'

do iced.util.enableDebugMode if debug = true
connectionString = "postgresql:///#{process.env.USER}-secretarius"

app = do express

#app.use express.logger()
app.use (req, res, next) ->
	for i in req.accepted
		switch i.subtype
			when 'json'
				req.url = "/json#{req.url}"
				break
			when 'html'
				req.url = "/index.html"
				break
	do next

app.use express.compress()
app.use express.static "#{__dirname}/client"
app.use express.cookieParser()
app.use express.cookieSession
	secret: "secret-#{Math.random()}"
app.use express.bodyParser()



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