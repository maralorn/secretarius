#!/usr/bin/env _coffee
DEADTIME = 500
deadtime = false
fs = require 'fs-extra'
less = require 'less'
stitch = require 'stitch'
jade = require 'jade'
glob = require 'glob'
path = require 'path'
util = require('libsecretarius').util
optimist = require 'optimist'
browserify = require 'browserify'
streamlineCompiler = require 'streamline/lib/compiler/compile'

argv = require('optimist')
	.boolean('debug')
	.alias('d', 'debug')
	.default('debug', false)
	.boolean('watch')
	.alias('w', 'watch')
	.default('watch', false)
	.argv

_node = (_, data, filename, ext) ->
	pre = "/tmp/#{path.basename filename, ext}"
	fs.writeFile "#{pre}#{ext}", data, 'utf8', _
	try
		streamlineCompiler.compile _, ["#{pre}#{ext}"], action: 'compile'
		data = fs.readFile "#{pre}js", 'utf8', _
		fs.unlink "#{pre}js", _
	catch err
		throw err
	finally
		fs.unlink "#{pre}#{ext}", _
	data
	
compiler =
	less:
		ext: 'css'
		compiler: (_, data, filename) -> less.render data, {compress: not argv.debug}, _
	jade:
		ext: 'js'
		compiler: (_, data, filename) ->
				content = jade.compile data,
					client: true
					compileDebug: argv.debug
					pretty: argv.debug
					filename: filename
				"module.exports = #{content}"
	_coffee:
		ext: 'js'
		compiler: (_, data, filename) -> _node _, data, filename, '_coffee'
	_js:
		ext: 'js'
		compiler: (_, data, filename) -> _node _, data, filename, '_js'

parseFile = (_, filepath) ->
	data = fs.readFile filepath, 'utf8', _
	used = []
	dir = path.dirname filepath
	ext = path.extname(filepath)[1..]
	name = path.basename filepath, ext
	while (comp = compiler[ext])?
		ext = comp.ext
		data = comp.compiler _, data, filepath
	dirlist = dir.split path.sep
	dirlist[0] = 'lib'
	dir = path.join.apply null, dirlist
	dirlist.push "#{name}#{ext}"
	fs.mkdirp dir, _
	filepath = path.join.apply null, dirlist
	fs.writeFile filepath, data, 'utf8', _
	console.log new Date().toLocaleString(), 'built', filepath

fs.remove "#{__dirname}/lib", _
filepaths = glob 'src/**/*.*', {}, _
files = {}
for filepath in filepaths
	files[filepath] = parseFile null, filepath

for filepath, future of files
	future _
	watch = (filepath) ->
		fs.watch filepath, (event, filename, _) ->
			if event is 'change'
				parseFile _, filepath
				buildapp _
				watch filepath
	if argv.watch
		watch filepath

buildapp = (_) ->
	b = browserify()
	b.add "#{__dirname}/lib/app/secretarius.js"
	fs.writeFile 'lib/client/secretarius.js', b.bundle(_), _
	console.log new Date().toLocaleString(), 'built', 'lib/client/secretarius.js'
buildapp _
fs.copy require.resolve('libsecretarius/lib/events'), 'lib/client/events.js', _
console.log new Date().toLocaleString(), 'built', 'lib/client/events.js'

###
task 'stitch', 'Build secretarius.js from src/ and app/', ->
	stitch_ = stitch.createPackage
		paths: ['buildapp', 'vendor']
	rm 'lib/client/secretarius.min.js'
	rm 'buildapp', ->
		files = ("./src/#{file}.iced" for file in appfiles)
		cp 'app/', 'buildapp/', ->
			cp.apply null, files.concat ['buildapp', ->
				stitch_.compile (error, js) ->
					if error?
						console.log error
					else
						fs.writeFileSync "./lib/client/secretarius.js", js, 'utf8'
					fs.appendFileSync 'lib/client/secretarius.js', '\nrequire("secretarius");', 'utf8'
					rm 'buildapp'
					p = spawn 'node_modules/.bin/uglifyjs', ['lib/client/secretarius.js']
					p.stderr.on 'data', (data) ->
						process.stderr.write data.toString()
					p.stdout.on 'data', (data) ->
						fs.appendFileSync 'lib/client/secretarius.min.js', do data.toString, 'utf8'
					]
###
