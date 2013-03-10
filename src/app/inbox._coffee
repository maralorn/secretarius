ui = require './ui'

class InboxView extends ui.View
	@registerView /^inbox$/, this, (_) -> 'Inbox'

	constructor: (@slot) ->
		@size = @first = null
		@context = @slot.getContentNode()
		@slot.setContent do require "./template/inbox"
		@innerslot = new ui.Slot do $('.inboxinfo', do @slot.getContentNode).first, do $('h1', do @slot.getContentNode).first
		model.inbox.onChanged @draw
		model.inbox.get (err, values) => unless err? then @draw values
		innerFlip = new ui.Flippable $('.newasap', @context), $('.newproject', @context), 0
		outerFlip = new ui.Flippable $('.front', @context), $('.back', @context), 500
		outerFlip.addToggler $('.front > button', @context)
		outerFlip.addToggler $('.back > button', @context)
		$('button[name=asap]', @context).click innerFlip.showFront
		$('button[name=project]', @context).click innerFlip.showBack
		@asapCreator = new ui.AsapCreator $('.newasap', @context)
		@projectCreator = new ui.ProjectCreator $('.newproject', @context)

	delete: ->
		model.inbox.removeCb 'changed', @draw

	draw: (values) =>
		unless @size is values.size
			@slot.setTitle "Inbox (#{@size = values.size})"
		unless @first is values.first
			@first = values.first
			@asapCreator.setReference @first
			@projectCreator.setReference @first
			if @first?
				@innerslot.setView "#{@first.type}:#{@first.id}"
			else
				do @innerslot.clear
