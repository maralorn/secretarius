iced = require 'myiced'
iced.util.pollute window

model = require 'jsonmodel'

exports.View = class View
	_views = []

	@registerView: (regex, cls, label) ->
		_views.push
			regex: regex
			cls: cls
			label: label
	
	@getLabel: func (cb, viewname) ->
		[row, params] = @_find viewname
		if row?.label?
			row.label c(cb), params
		else
			cb viewname

	@create: (viewname, slot) ->
		[row, params] = @_find viewname
		new row.cls slot, params if row?

	@_find: (viewname) ->
		for row in _views
			params = row.regex.exec viewname
			return [row, params] if params?
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

	clear: =>
		do @view?.delete
		do @getContentNode().empty
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

exports.id2viewname = func (autocb, id) ->
	await model.cache.getInformation defer(info), id
	exports.info2viewname info
	
exports.info2viewname = (info) ->
	"#{info.type}:#{info.id}"

exports.id2label = func (cb, id) ->
	await exports.id2viewname defer(viewname), id
	exports.label c(cb), viewname

exports.label = (cb, viewname) ->
	View.getLabel cb, viewname
	
exports.inbox = require 'inbox'
exports.slots = require 'slots'
exports.info = require 'info'
