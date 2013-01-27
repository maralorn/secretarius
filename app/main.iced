model = require 'jsonmodel'

iced = require 'myiced'
iced.util.pollute window

ui = require 'ui'

class InboxView extends ui.View
	@registerView /^$/, this, func (autocb) -> 'Secretarius'

	constructor: (@slot) ->
		await model.AsapList.getAll defer(error, lists)
		@slot.setContent require("template/main")
			lists: lists
		for list in lists
			new ui.Emitter($("button[name=#{list.id}]")).setViewName "asaplist:#{list.id}"
		content = $('input[name=note]')
		$('form[name=note]').submit (ev) =>
			do ev.preventDefault
			new model.Note().create ((error) -> content.val '' unless error?), content.val()
		$('form[name=list]').submit (ev) =>
			do ev.preventDefault
			new model.AsapList().create ((error) => @slot.setView '' unless error?), $('input[name=list]').val()
	
	delete: ->
