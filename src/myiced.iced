a = (cb) -> do cb
await a defer()
module.exports = exports = iced

exports.throw2cb = throw2cb = (func) ->
	(args...) ->
		cb = args[0]
		args[0] = (args...) -> cb.apply null, [null].concat args
		args[0].__throw2cb = cb
		try
			func.apply this, args
		catch error
			cb error

continuationCatcher = (continuation, cb) ->
	(args...) ->
		args[0] = cb
		try
			continuation.apply this, args
		catch error
			cb.__throw2cb error
	

exports.cb2throw = cb2throw = (cb) ->
	(args...) ->
		if args[0]?
			throw args[0]
		else
			cb.apply null, args[1..]

exports.throwError = throwError = (msg, data) ->
	throw new Error "#{msg} #{if data? then JSON.stringify data else ''}"

__fd = iced.findDeferral

iced.findDeferral = (args) ->
	if args[0]?.__throw2cb?
		value: __fd args
		cb: args[0]
	else
		__fd args

iced.Deferrals = class Deferrals extends iced.Deferrals
	constructor: (k, t) ->
		if t.parent?.cb?
			cb = t.parent.cb
			t.parent = t.parent.value
			super continuationCatcher(k, cb), t
		else
			super k, t

iced.catchExceptions?()

exports.pollute = (obj) ->
	obj.f = throw2cb
	obj.c = cb2throw
	obj.e = throwError
