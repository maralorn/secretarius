model = require 'jsonmodel'

iced = require 'myiced'
iced.util.pollute window

ui = require 'ui'

class InboxView extends ui.View
	@registerView /^$/, this, func (autocb) -> 'Secretarius'

	constructor: (@slot) ->
		@slot.setContent require('template/main')()
		new ui.NoteCreator $('.newnote', @contentNode)
		new ui.AsapListsList $('.lists', @contentNode)
		new ui.AsapListCreator $('.newlist', @contentNode)
	
	delete: ->
