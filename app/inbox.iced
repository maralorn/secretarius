model = require 'jsonmodel'
iced = require 'myiced'
iced.pollute window
ui = require 'ui'

class InboxView extends ui.View
	@registerView /^inbox$/, this, f (autocb) -> 'Inbox'

	constructor: (@slot) ->
		@size = @first = null
		model.inbox.onChanged @draw
		model.inbox.get @draw
		@slot.setContent require("template/inbox").render()
		@innerslot = new Slot do $('div', do @slot.getContentNode).first, do $('h1', do @slot.getContentNode).first
	
	delete: ->
		model.inbox.removeCb 'changed', @draw

	draw: (values) =>
		unless @size is values.size
			@slot.setTitle "Inbox (#{@size = values.size})"
		unless @first is values.first
			@first = values.first
			if @first?
				@innerslot.setView "#{@first.type}:#{@first.id}"
			else
				do @innerslot.clear
