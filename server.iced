require "systemd"
express = require "express"
stitch  = require "stitch"
http = require "http"
fs = require "fs"
less = require "less"
{compile: compileJade} = require "jade"
{compile: compileIced} = require "iced-coffee-script"
{parser: jsp, uglify: pro} = require "uglify-js"

app = express()
debug = true


lib = stitch.createPackage
	paths: ["#{__dirname}/client"]
	compilers:
		iced: (module, filename) ->
			content = compileIced fs.readFileSync filename, "utf8"
			module._compile content, filename
		jade: (module, filename) ->
			content = compileJade fs.readFileSync(filename, "utf8"),
				client: true
				compileDebug: debug
				pretty: debug
				filename: filename
			module._compile "exports.render = #{content}", filename

htmlcache = csscache = jscache = null

app.get "/", (req, res) ->
	unless htmlcache? and not debug
		htmlcache = fs.readFileSync("#{__dirname}/client/index.html", "utf8")
	res.set "Content-Type", "text/html"
	res.send htmlcache

app.get "/secretarius.js", (req, res) ->
	unless jscache? and not debug
		await lib.compile defer e, js
		console.log e if e?
		jscache = if debug then js else pro.gen_code pro.ast_squeeze pro.ast_mangle jsp.parse js
	res.set "Content-Type", "application/javascript"
	res.send jscache

app.get "/style.css", (req, res) ->
	unless csscache? and not debug
		await less.render fs.readFileSync("#{__dirname}/client/style.less", "utf8"),
			{compress: not debug},
			defer(e, css)
		console.log e if e?
		csscache = css
	res.set "Content-Type", "text/css"
	res.send csscache

http.createServer(app).listen if process.env.LISTEN_PID > 0 then "systemd" else 3000
