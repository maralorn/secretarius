exports.View = class View
	_views = {}

	@registerView: (regex, cls, label) ->
		_views[regex] = cls
		cls.__label = label if label?
	
	@getLabel: f (cb, viewname) ->
		[cls, params] = @_find viewname
		if cls?.__label?
			cls.__label c(cb), params
		else
			cb viewname

	@create: (viewname, slot) ->
		[cls, params] = @_find viewname
		return new cls slot, params if cls?

	@_find: (viewname) ->
		for regex, cls of _views
			params = viewname.match regex
			return [cls, params] if params?
		[null, null]

exports.Slot = class Slot
	constructor: (@contentNode, @titleNode) ->
		@emitter = new Emitter do @getTitleNode
		do @clear

	setView: (viewname) ->
		do @clear
		@view = View.create viewname, this
		@emitter.setViewName viewname

	setTitle: (title) ->
		@getTitleNode().html title
		
	setContent: (html) ->
		@getContentNode().html html

	getContentNode: ->
		@contentNode

	getTitleNode: ->
		@titleNode

	clear: ->
		do @view?.delete
		@getContentNode().empty()
		@setTitle 'Secretarius'

exports.Emitter = class Emitter
	constructor: (@node, @slotGenerator) ->
		@slotGenerator ?= do SlotGenerator.getDefault
# TODO: Drag
		@node.click =>
			@slotGenerator.show do @getViewName
	
	setViewName: (@viewName) ->

	getViewName: ->
		@viewName
		
exports.SlotGenerator = class SlotGenerator
	_default = null
	@setDefault: (generator) ->
		_default = generator
	@getDefault: ->
		_default

exports.WindowSlotGenerator = class WindowSlotGenerator extends SlotGenerator
	show: (viewname) ->
		window.open "#{document.URL.match(/https?:\/\/.*\//)[0]}#{viewname}", '', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no'
	@setDefault new this
