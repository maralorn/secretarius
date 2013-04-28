#!/usr/bin/env _coffee
fs = require 'fs-extra'
less = require 'less'
jade = require 'jade'
glob = require 'glob'
path = require 'path'
util = require('libsecretarius').util
optimist = require 'optimist'
browserify = require 'browserify'
streamlineCompiler = require 'streamline/lib/compiler/compile'
UglifyJS = require 'uglify-js'

argv = require('optimist')
	.boolean('debug')
	.alias('d', 'debug')
	.default('debug', false)

	.boolean('watch')
	.alias('w', 'watch')
	.default('watch', false)

	.boolean('fibers')
	.alias('f', 'fibers')
	.default('fibers', false)

	.argv

_node = (_, data, filename, ext) ->
	pre = "/tmp/#{path.basename filename, ext}"
	fs.writeFile "#{pre}#{ext}", data, 'utf8', _
	try
		streamlineCompiler.compile _, ["#{pre}#{ext}"],
			action: 'compile'
			fibers: argv.fibers and not /client/.test filename
			lines: 'ignore'

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
		ext: 'html'
		compiler: (_, data, filename) ->
				content = jade.compile data,
					compileDebug: argv.debug
					pretty: argv.debug
					filename: filename
				content()
	_coffee:
		ext: 'js'
		compiler: (_, data, filename) -> _node _, data, filename, '_coffee'
	_js:
		ext: 'js'
		compiler: (_, data, filename) -> _node _, data, filename, '_js'

parseFile = (_, filepath) ->
	console.log new Date().toLocaleString(), 'building', filepath
	data = fs.readFile filepath, _
	used = []
	dir = path.dirname filepath
	ext = path.extname(filepath)[1..]
	name = path.basename filepath, ext
	while (comp = compiler[ext])?
		ext = comp.ext
		data = new Buffer comp.compiler _, data.toString('utf-8'), filepath
	dirlist = dir.split path.sep
	dirlist[0] = 'lib'
	dir = path.join.apply null, dirlist
	dirlist.push "#{name}#{ext}"
	fs.mkdirp dir, _
	filepath = path.join.apply null, dirlist
	fs.writeFile filepath, data, _
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
				try
					parseFile _, filepath
					buildjs _
				catch e
					console.log e.stack
				watch filepath
	if argv.watch
		watch filepath

buildjs = (_) ->
	b = browserify()
	b.add "#{__dirname}/lib/client/js/secretarius.js"
	code = b.bundle _
	unless argv.debug
		ast = UglifyJS.parse code
		do ast.figure_out_scope
		compressor = UglifyJS.Compressor()
		ast = ast.transform compressor
		do ast.figure_out_scope
		do ast.compute_char_frequency
		do ast.mangle_names
		code = ast.print_to_string()
	fs.writeFile 'lib/client/secretarius.js', code, _
	console.log new Date().toLocaleString(), 'built', 'lib/client/secretarius.js'
f = buildjs()
fs.copy require.resolve('libsecretarius/lib/events'), 'lib/client/events.js', _
console.log new Date().toLocaleString(), 'built', 'lib/client/events.js'
f _
fs.remove "#{__dirname}/lib/client/js", _ unless argv.watch
