exports.serve = (app, debug = false) ->

	fs = require "fs"

	clientdir = "#{__dirname}/client"
	modeldir = "#{__dirname}/../models"

	lib = require("stitch").createPackage
		paths: [clientdir, modeldir]
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

	app.use require("express").static "#{clientdir}/static"

	app.get /^\/html\//, (req, res) ->
		unless htmlcache? and not debug
			htmlcache = fs.readFileSync("#{clientdir}/index.html", "utf8")
		res.type "html"
		res.send htmlcache

	app.get "/secretarius.js", (req, res) ->
		unless jscache? and not debug
			await lib.compile defer error, jscache
			return res.json 500, error if error?
			{parser: parser, uglify: uglify} = require "uglify-js"
			jscache = if debug then jscache else uglify.gen_code uglify.ast_squeeze uglify.ast_mangle parser.parse jscache
		res.type "text/javascript"
		res.send jscache

	app.get "/style.css", (req, res) ->
		unless css? and not debug
			await require("less").render fs.readFileSync("#{clientdir}/style.less", "utf8"),
				{compress: not debug},
				defer(error, csscache)
			return res.json 500, error if error?
		res.type "css"
		res.send csscache
