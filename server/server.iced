fs = require "fs"

connectionString = "postgresql:///#{process.env.USER}-secretarius"
debug = true
clientdir = "#{__dirname}/../client"
bothdir = "#{__dirname}/../both"

lib = require("stitch").createPackage
	paths: [clientdir,bothdir]
	compilers:
		iced: (module, filename) ->
			content = require("iced-coffee-script").compile fs.readFileSync(filename, "utf8"),
				runtime: "window"
			module._compile content, filename
		jade: (module, filename) ->
			content = require("jade").compile fs.readFileSync(filename, "utf8"),
				client: true
				compileDebug: debug
				pretty: debug
				filename: filename
			module._compile "exports.render = #{content}", filename

htmlcache = csscache = jscache = null
app = (express = require "express")()
	
app.use express.static "client/static"
app.use express.bodyParser()

app.get "/", (req, res) ->
	unless htmlcache? and not debug
		htmlcache = fs.readFileSync("#{clientdir}/index.html", "utf8")
	res.set "Content-Type", "text/html"
	res.send htmlcache

app.get "/secretarius.js", (req, res) ->
	unless jscache? and not debug
		await lib.compile defer e, js
		console.log e if e?
		{parser: jsp, uglify: pro} = require "uglify-js"
		jscache = if debug then js else pro.gen_code pro.ast_squeeze pro.ast_mangle jsp.parse js
	res.set "Content-Type", "application/javascript"
	res.send jscache

app.get "/style.css", (req, res) ->
	unless csscache? and not debug
		await require("less").render fs.readFileSync("#{clientdir}/style.less", "utf8"),
			{compress: not debug},
			defer(e, css)
		console.log e if e?
		csscache = css
	res.set "Content-Type", "text/css"
	res.send csscache

require("controller").serve app,
	require("model").extend require("pgmodel").connect connectionString

require "systemd"
require("http").createServer(app).listen if process.env.LISTEN_PID > 0 then "systemd" else 3000