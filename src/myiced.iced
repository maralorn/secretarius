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
			await catcher defer(error), error
		@cb error

exports.throw2cb = throw2cb = (func) ->
	(args...) ->
		saveHandler = @.__errorHandler
		@.__errorHandler = handler = new ErrorHandler args[0]
		args[0] = (args...) -> handler.cb.apply null, [null].concat args
		args[0].__errorHandler = handler
		func.apply this, args
		@.__errorHandler = saveHandler

continuationCatcher = (errorHandler, continuation) ->
	(args...) ->
		args[0] = {} unless args[0]?
		saveHandler = @.__errorHandler
		@.__errorHandler = args[0].__errorHandler = errorHandler
		continuation.apply this, args
		@.__errorHandler = saveHandler

exports.cb2throw = cb2throw = (cb, args...) ->
	handler = @.__errorHandler
	for arg in args
		if arg?
			do console.trace
			throw 'cb2throw can only take one parameter.'
	(args...) ->
		if args[0]?
			if handler?
				handler.handle args[0]
			else
				throw args[0]
		else
			cb.apply this, args[1..]

addNull = (cb) ->
	(args...) ->
		cb.apply this, [null].concat args

exports.addCatcher = addCatcher = (catcher) ->
	@.__errorHandler?.addCatcher catcher

exports.util = {}

exports.util.throwError = throwError = (error) ->
	@.__errorHandler.handle error


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


exports.util.singlify = singlify = (func) ->
	calls = []
	(cb, args...) ->
		for call in calls
			if arrayEqual(args, call.args) and call.context is this
				return call.cbs.push cb
		calls.push call =
			args: args
			cbs: [cb]
			context: this
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

debugOn = false
exports.util.enableDebugMode = () -> debugOn = true

errString = ->
	b = Error.prepareStackTrace
	Error.prepareStackTrace = (_, stack) -> stack
	e = new Error
	Error.captureStackTrace e, this
	s = e.stack
	Error.prepareStackTrace = b
	time = new Date().toString().match(/\d+:\d+:\d+/)[0]
	file = s[2].getFileName().match(/\/(\w*).\w*$/)[1]
	line = do s[2].getLineNumber
	for i in s[2..]
		func = do i.getFunctionName
		if func? and not /throw2cb/.test func
			break
	func = func.replace /module.exports./, ''
	"#{time} #{func} in #{file} at #{line}"
exports.debug = debug = (args...) ->
	return unless debugOn
	console.log.apply null, [errString()].concat args

exports.util.pollute = pollute = (obj) ->
	obj.func = throw2cb
	obj.catchNull= cb2throw
	obj.addNull = addNull
	obj.catchCB = addCatcher
	obj.throwError = throwError
	obj.debug = debug
	obj.singlify = singlify
