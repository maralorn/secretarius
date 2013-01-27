iced = require 'myiced'
iced.util.pollute window

model = require 'jsonmodel'

exports.message = (msg) ->
	msgcontainer = $('#msgcontainer')
	(msgnode = $(require('template/msg') msg: msg)).appendTo msgcontainer
	(lb = $('<br>')).appendTo msgcontainer
	do msgnode.hide
	msgnode.show 1000
	setTimeout (->	msgnode.hide 1000, -> do msgnode.remove; do lb.remove), 5000
	return msgnode

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
			row.label catchNull(cb), params
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

	@test: (viewname) ->
		@_find(viewname)[0]?

exports.DropArea = class Droparea
	constructor: (contentNode, cb) ->
		contentNode.bind 'dragover', (ev) -> do ev.originalEvent.preventDefault
		contentNode.bind 'drop', (ev) ->
			do ev.originalEvent.preventDefault
			cb ev.originalEvent.dataTransfer.getData 'text/plain'

exports.Slot = class Slot
	constructor: (@contentNode, @titleNode) ->
		@emitter = new Emitter do @getTitleNode
		do @clear

	setView: (viewname) =>
		if View.test viewname
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
		@node.attr 'draggable', 'true'
		@node.bind 'dragstart', (ev) =>
			ev.originalEvent.dataTransfer.setData 'text/plain', do @getViewName
			ev.originalEvent.dataTransfer.setData 'text/uri-list', "http://#{window.location.host}/#{do @getViewName}"
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

exports.Flippable = class Flippable
	FLIP_TIME = 500
	constructor: (@front, @back) ->
		@flipped = false
		do @front?.show
		do @back?.hide
	
	showBack: =>
		@front?.hide 500
		@back?.show 500

	showFront: =>
		@front?.show 500
		@back?.hide 500

	toggle: =>
		if @flipped = not @flipped
			do @showBack
		else
			do @showFront

	addToggler: (toggler) ->
		toggler.click =>
			do @toggle
			false

exports.Uploader = class Uploader
	defaults =
		upload: -> return
		name: 'File'

	constructor: (@node, @options = {}) ->
		defaultTo @options, defaults
		@node.html require('template/upload') @options
		links = $('button', @node)
		flip = new Flippable do links.first, $('form', @node)
		flip.addToggler links

exports.TimePicker = class TimePicker
	units =
		year: 'FullYear'
		month: 'Month'
		day: 'Date'
		minute: 'Minutes'
		hour: 'Hours'
		second: 'Seconds'
	defaults =
		change: ->
		name: 'Time'

	constructor: (@node, @options) ->
		defaultTo @options, defaults
		@node.html require('template/timepicker') @options
		@node.addClass 'timepicker'
		@outerFlip = new Flippable $('.front', @node), $('.back', @node)
		@innerFlip = new Flippable $('.front > button', @node), $('.front > span', @node)
		@outerFlip.addToggler $('button', @node)
		@display = $('span.reltime', @node)
		for unit of units
			this[unit] = $("input[name='#{unit}']", @node)
		@setDate @options.date
		$('button[name=delete]', @node).click =>
			@options.change null
			@setDate null
			false
		$('button[name=save]', @node).click =>
			do @save
			false

	setDate: (@date) =>
		date = @date
		if @date?
			do @innerFlip.showBack
		else
			do @innerFlip.showFront
			date = new Date
		@display.attr 'x-time', date
		for unit, fn of units
			this[unit].val do date["get#{fn}"] + if unit is 'month' then 1 else 0

	save: =>
		date = new Date
		try
			for unit, fn of units
				date["set#{fn}"] do this[unit].val - if unit is 'month' then 1 else 0
		catch error
			date = null
		@options.change date
		@setDate date
		
	getDate: =>
		@date

		
exports.defaultTo = defaultTo = (obj, defaults) ->
	for key, value of defaults
		obj[key] = value unless obj[key]?

exports.id2viewname = func (autocb, id) ->
	await model.cache.getInformation defer(info), id
	exports.info2viewname info
	
exports.viewname2id = func (autocb, viewname) ->
	if (id = /^\w*:(.*)$/.exec(viewname)?[1])?
		await model.cache.getInformation defer(info), id
		info
	else
		throwError "No Infoview Name:#{viewname}"

exports.info2label = (cb, info) ->
	exports.label cb, exports.info2viewname info
	
exports.info2viewname = (info) ->
	"#{info.type}:#{info.id}"

exports.id2label = func (cb, id) ->
	await exports.id2viewname defer(viewname), id
	exports.label catchNull(cb), viewname

exports.label = (cb, viewname) ->
	View.getLabel cb, viewname
	
exports.inbox = require 'inbox'
exports.slots = require 'slots'
exports.info = require 'info'
exports.main = require 'main'
