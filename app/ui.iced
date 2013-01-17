exports.View = class View
	@views: {}

	@registerView: (regex, cls) ->
		@views[regex] = cls

	@create: (viewname, slot) ->
		for regex, cls of @views
			params = viewname.match regex
			return new cls slot, params if params?

exports.Slot = class Slot
	setView: (viewname) ->
		do @clear if @view?
		@view = View.create viewname, this
		
	setContent: (html) ->
		getContentNode().html html

	setTitle: (title) ->
		@title.html title
	
	clear: ->
		do @view?.delete

exports.Emitter = class Emitter
	constructor: (@node, @viewName, @slotGenerator) ->
		@slotGenerator ?= do SlotGenerator.getDefault
# TODO: Drag
		@node.click =>
			await @getViewName defer error, viewName
			@slotGenerator.show viewName unless error?

	getViewName: f (autocb) ->
		@viewName

	getInformation: f (autocb) ->
		null

class InfoEmitter extends Emitter
	constructor: (node, @id, @type, slotGenerator) ->
		super node, "#{@type}/#{@id}", slotGenerator
	
	createView: (viewslot) ->
		InfoView.create viewslot, @info

	getInformation: ->
		@info

exports.CreateEmitter = class CreateEmitter extends Emitter
	constructor: (node, @createcallback, slotgenerator) ->

exports.SlotGenerator = class SlotGenerator
	default_ = null
	@setDefault: (generator) ->
		default_ = generator
	@getDefault: ->
		default_

exports.WindowSlotGenerator = class WindowSlotGenerator extends SlotGenerator
	show: (viewname) ->
		window.open "#{document.URL.match(/https?:\/\/.*\//)[0]}#{viewname}", '', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no'
	@setDefault new this
