a = (cb) -> do cb
await a defer()

module.exports = exports = iced
exports.debugging = false

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
	

exports.cb2throw = cb2throw = (cb, args...) ->
	for arg in args
		if arg?
			do console.trace
			throwError 'cb2throw can only take one parameter.'
	(args...) ->
		if args[0]?
			throw args[0]
		else
			cb.apply null, args[1..]

exports.throwError = throwError = (msg, data) ->
	throw new Error "#{msg} #{if data? then JSON.stringify data else ''}"

exports.debug = debug = (args...) ->
	return unless exports.debugging
	b = Error.prepareStackTrace
	Error.prepareStackTrace = (_, stack) -> stack
	e = new Error
	Error.captureStackTrace e, this
	s = e.stack
	Error.prepareStackTrace = b
	time = new Date().toString().match(/\d+:\d+:\d+/)[0]
	file = s[1].getFileName().match(/\/(\w*).js$/)[1]
	line = do s[1].getLineNumber
	for i in s[1..]
		func = do i.getFunctionName
		if func? and not /throw2cb/.test func
			break
	func = func.replace /module.exports./, ''
	console.log.apply null, ["#{time} #{func} in #{file} at #{line} |"].concat args

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
	obj.d = debug
