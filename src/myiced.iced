a = (cb) -> do cb
await a defer()

module.exports = exports = iced

class ErrorHandler
	constructor: (@cb) ->
		@catchers = []

	addCatcher: (catcher) ->
		@catchers.push catcher
	handle: (error) ->
		for catcher in @catchers
			try
				catcher error
				return
			catch error
		@cb error

exports.throw2cb = throw2cb = (func) ->
	(args...) ->
		saveHandler = @.__errorHandler
		@.__errorHandler = handler = new ErrorHandler args[0]
		args[0] = (args...) -> handler.cb.apply null, [null].concat args
		args[0].__errorHandler = handler
		try
			func.apply this, args
		catch error
			handler.handle error
		@.__errorHandler = saveHandler

continuationCatcher = (errorHandler, continuation) ->
	(args...) ->
		args[0] = {} unless args[0]?
		saveHandler = @.__errorHandler
		@.__errorHandler = args[0].__errorHandler = errorHandler
		try
			continuation.apply this, args
		catch error
			errorHandler.handle error
		@.__errorHandler = saveHandler

exports.cb2throw = cb2throw = (cb, args...) ->
	handler = @.__errorHandler
	do console.trace unless handler?
	for arg in args
		if arg?
			do console.trace
			throwError 'cb2throw can only take one parameter.'
	(args...) ->
		if args[0]?
			handler.handle args[0]
		else
			cb.apply this, args[1..]

addNull = (cb) ->
	(args...) ->
		cb.apply this, [null].concat args

exports.addCatcher = addCatcher = (catcher) ->
	@.__errorHandler?.addCatcher catcher

__fd = iced.findDeferral

iced.findDeferral = (args) ->
	if args[0]?.__errorHandler?
		value: __fd args
		errorHandler: args[0].__errorHandler
	else
		__fd args

iced.Deferrals = class Deferrals extends iced.Deferrals
	constructor: (k, t) ->
		if t.parent?.errorHandler?
			@.__errorHandler = errorHandler = t.parent.errorHandler
			t.parent = t.parent.value
			super continuationCatcher(errorHandler, k), t
		else
			super k, t

	defer: (options) ->
		if @.__errorHandler?
			errorHandler = @.__errorHandler
			cb = super options
			(args...) ->
				if args[0]?
					errorHandler.handle args[0]
				else
					cb.apply this, args[1..]
		else
			super options
		
		
		
	
iced.catchExceptions?()

exports.util = {}

exports.util.singlify = singlify = (func) ->
	calls = []
	(cb, args...) ->
		for call in calls
			if arrayEqual args, call.args
				return call.cbs.push cb
		calls.push call =
			args: args
			cbs: [cb]
		caller = (args...) ->
			calls = (cl for cl in calls when cl isnt call)
			for cb in call.cbs
				cb.apply this, args
		func.apply this, [caller].concat args

exports.util.arrayEqual = arrayEqual = (a, b) ->
	return true if a is b
	return false if a.length isnt b.length
	for element, index in a
		return false if element isnt b[index]
	true

exports.util.throwError = throwError = (msg, data) ->
	throw new Error "#{msg} #{if data? then JSON.stringify data else ''}"

debugOn = false
exports.util.enableDebugMode = () -> debugOn = true

exports.debug = debug = (args...) ->
	return unless debugOn
	b = Error.prepareStackTrace
	Error.prepareStackTrace = (_, stack) -> stack
	e = new Error
	Error.captureStackTrace e, this
	s = e.stack
	Error.prepareStackTrace = b
	time = new Date().toString().match(/\d+:\d+:\d+/)[0]
	file = s[1].getFileName().match(/\/(\w*).\w*$/)[1]
	line = do s[1].getLineNumber
	for i in s[1..]
		func = do i.getFunctionName
		if func? and not /throw2cb/.test func
			break
	func = func.replace /module.exports./, ''
	console.log.apply null, ["#{time} #{func} in #{file} at #{line} |"].concat args


exports.util.pollute = pollute = (obj) ->
	obj.func = throw2cb
	obj.catchNull= cb2throw
	obj.addNull = addNull
	obj.catchCB = addCatcher
	obj.throwError = throwError
	obj.d = debug
	obj.singlify = singlify
