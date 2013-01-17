debug = true
DEADTIME = 1500


fs = require 'fs'
{print} = require 'util'
{spawn} = require 'child_process'
less = require 'less'
stitch = require 'stitch'
jade = require 'jade'
{parser, uglify} = require 'uglify-js'
iced__ = require 'iced-coffee-script'

appfiles = ['myiced', 'models/basemodel', 'models/jsonmodel']

cp = (args..., cb) ->
	p = spawn 'cp', ['-r'].concat args
	p.stderr.on 'data', (data) ->
		process.stderr.write data.toString()
	p.stdout.on 'data', (data) ->
		print data.toString()
	p.on 'exit', cb if cb?
	
rm = (dir, cb) ->
	p = spawn 'rm', ['-r', dir]
	p.stdout.on 'data', (data) ->
		print data.toString()
	p.on 'exit', cb if cb?

task 'build', 'Build lib/ from src/ and app/', ->
	invoke 'iced'
	invoke 'less'
	invoke 'static'
	invoke 'stitch'
	
task 'iced', 'Compile iced files from src/ to lib/', ->
	iced_ = spawn 'iced', ['-c', '-o', 'lib', 'src']
	iced_.stderr.on 'data', (data) ->
		process.stderr.write data.toString()
	iced_.stdout.on 'data', (data) ->
		print data.toString()
	
task 'less', 'Compile less files from src/client/ to lib/client/', ->
	fs.readdir './src/client/', (err, files) ->
		for filename in files
			if (file = filename.match(/(\w*)\.less$/)?[1])?
				less.render fs.readFileSync("./src/client/#{file}.less", 'utf8'), {compress: not debug}, (error, css) ->
					if error?
						print error
					else
						fs.writeFileSync "./src/client/#{file}.css", css, 'utf8'

task 'static', 'Copy static files from src/static/ to lib/static/', ->
	for file in fs.readdirSync './src/static/'
		cp "src/static/#{file}", 'lib/client', null


task 'stitch', 'Build secretarius.js from src/ and app/', ->
	stitch_ = stitch.createPackage
		paths: ['buildapp']
		compilers:
			iced: (module, filename) ->
				content = iced__.compile fs.readFileSync(filename, 'utf8'),
					runtime: 'window'
				module._compile content, filename
			jade: (module, filename) ->
				content = jade.compile fs.readFileSync(filename, 'utf8'),
					client: true
					compileDebug: debug
					pretty: debug
					filename: filename
				module._compile "module.exports = #{content}", filename
	rm 'buildapp', ->
		files = ("./src/#{file}.iced" for file in appfiles)
		cp 'app/', 'buildapp/', ->
			cp 'vendor/', 'buildapp/lib/', ->
				cp.apply null, files.concat ['buildapp', ->
					stitch_.compile (error, js) ->
						if error?
							console.log error
						else
							fs.writeFileSync "./lib/client/secretarius.js", (if debug then js else uglify.gen_code uglify.ast_squeeze uglify.ast_mangle parser.parse js), 'utf8'
						rm 'buildapp']

task 'clear', 'Delete lib', ->
	rm libdir

task 'watch', 'Rebuild everything if change is noted', ->
	invoke 'build'
	deadtime = false
	fs.watch './src', cb = (event, filename) ->
		if not /^\./.test(filename) and event is 'change' and not deadtime
			deadtime = true
			console.log 'rebuild everything', do new Date().toLocaleString
			invoke 'build'
			setTimeout (-> deadtime = false), DEADTIME
	fs.watch './app', cb
