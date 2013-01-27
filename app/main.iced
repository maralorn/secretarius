model = require 'jsonmodel'

iced = require 'myiced'
iced.util.pollute window

ui = require 'ui'

class InboxView extends ui.View
	@registerView /^$/, this, func (autocb) -> 'Secretarius'

	constructor: (@slot) ->
		@slot.setContent require("template/main")
			lists: []
		content = $('input[name=note]')
		$('form[name=note]').submit (ev) =>
			do ev.preventDefault
			new model.Note().create ((error) -> content.val '' unless error?), content.val()
#		$('form[name=list]').submit (ev) =>
#			do ev.preventDefault
#			new model.AsapList().create (->) , $('input[name=note]').val()

	
	delete: ->
