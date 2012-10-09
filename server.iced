require 'systemd'
express = require 'express'
stitch  = require 'stitch'
http = require 'http'
fs = require 'fs'
less = require 'less'
{compile: compileJade} = require 'jade'
{compile: compileIced} = require 'iced-coffee-script'

app = express()

app.get '/', (req, res) ->
	res.send '<script src="secretarius.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="style.css">
<script type="text/javascript">require("secretarius")</script>'

lib = stitch.createPackage
	paths: [__dirname + '/client']
	compilers:
		iced: (module, filename) ->
			content = compileIced fs.readFileSync filename, 'utf8'
			module._compile content, filename
		jade: (module, filename) ->
			content = compileJade fs.readFileSync(filename, 'utf8'), {client: true}
			module._compile "exports.render = "+content, filename

app.get '/secretarius.js', lib.createServer()

csscache = null
app.get '/style.css', (req, res) ->
	unless csscache?
		await less.render fs.readFileSync(__dirname + '/client/style.less', 'utf8'), defer(e, css)
		csscache = css
	console.log e if e?
	res.set 'Content-Type', 'text/css'
	res.send csscache

http.createServer(app).listen if process.env.LISTEN_PID > 0 then 'systemd' else 3000
