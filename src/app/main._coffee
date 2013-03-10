ui = require './ui'

class InboxView extends ui.View
	@registerView /^$/, this, (_) -> 'Secretarius'

	constructor: (@slot) ->
		@slot.setContent require('./template/main')()
		new ui.NoteCreator $('.newnote', @contentNode)
		new ui.AsapListsList $('.lists', @contentNode)
		new ui.AsapListCreator $('.newlist', @contentNode)
	
	delete: ->
