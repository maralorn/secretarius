require 'systemd'
express = require 'express'
http = require 'http'
app = express()

app.get '/', (req, res) ->
	res.send 'hello world'

http.createServer(app).listen 'systemd'
