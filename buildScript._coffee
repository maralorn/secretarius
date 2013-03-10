DEADTIME = 500
deadtime = true
fs = require 'fs'
less = require 'less'
stitch = require 'stitch'
jade = require 'jade'
glob = require 'glob'
path = require 'path'
streamlineCompiler = require 'streamline/lib/compiler/compile'


debug = true

compiler =
	less:
		ext: 'css'
		compiler: (_, data) -> less.render data, {compress: not debug}, _
	jade:
		ext: 'js'
		compiler: (_, data) ->
				content = jade.compile _,
					client: true
					compileDebug: debug
					pretty: debug
				"module.exports = #{content}"
	_coffee:
		ext: 'js'
		compiler: (_, data) ->
			pre = "/tmp/tmp_#{Math.random()}"
			fs.writeFile "#{pre}._coffee", data, 'utf8', _
			streamlineCompiler.compile _, "#{pre}._coffee"
			data = fs.readFile "#{pre}.js", 'utf8', _
			fs.unlink "#{pre}._coffee", _
			fs.unlink "#{pre}.js", _
			data

parseFile = (_, filepath) ->
	data = fs.readFile filepath, 'utf8', _
	used = []
	dir = path.dirname filepath
	ext = path.extname filepath
	name = path.basename filepath, ext
	while (comp = compiler[ext])?
		ext = comp.ext
		data = comp.compiler _, data
	dirlist = dir.split path.sep
	dirlist[0] = 'lib'
	dir = path.join.apply null, dirlist
	dirlist.push "#{name}.#{ext}"
	filepath = path.join.apply null, dirlist
	fs.mkdir dir, 755, _
	fs.writeFile filepath, data, 'utf8', _
	console.log new Date().toLocaleString(), 'built', filepath

filepaths = glob 'src/**/*', {}, _
files = {}
for filepath in filepaths
	files[filepath] = parseFile null, filepath

for filepath, future of files
	future _
	fs.watch filepath, (event, filepath) ->
		if not /^\./.test(filename) and event is 'change' and not deadtime
		deadtime = true
		setTimeout (-> deadtime = false), DEADTIME
		parseFile null, filepath
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
