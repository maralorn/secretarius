
iced = require './myiced'
iced.util.pollute global

argv = require('optimist')
	.usage('secretarius [cmd] <args>')
	.boolean('debug')
	.alias('d', 'debug')
	.default('debug', false)
	.demand(1)
	.argv

connectionString = "postgresql:///#{process.env.USER}-secretarius"
pgmodel = require './models/pgmodel'
model = pgmodel connectionString

if argv.debug
	do iced.util.enableDebugMode

switch argv._[0]
	when 'server'
		require('./server') model
	when 'note'
		await new model.Note().create defer(error, id), argv._[1..].join(' ')
		code = if error? then 1 else 0
		process.exit code
	when 'status'
		do process.stdin.resume
		process.stdin.setEncoding 'utf8'
		process.stdin.on 'data', (chunk) ->
			try
				obj = JSON.parse chunk[1...]
			catch err
			if obj?
				await model.inbox.getSize defer(error, size)
				inbox =
					name: 'inbox'
					full_text: if error? then 'Secretarius error' else "Inbox: #{size}"
				if error?
					inbox.color = "#0000ff"
				else if size > 0
					inbox.color = "#00ff00"
				obj = [inbox].concat obj
				chunk = ",#{JSON.stringify obj}\n"
			process.stdout.write chunk
