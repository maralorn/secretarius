model = require 'jsonmodel'

iced = require 'myiced'
iced.util.pollute window

ui = require 'ui'

class InboxView extends ui.View
	@registerView /^inbox$/, this, func (autocb) -> 'Inbox'

	constructor: (@slot) ->
		@size = @first = null
		model.inbox.onChanged @draw
		model.inbox.get (err) -> console.log err if err?
		@slot.setContent do require "template/inbox"
		@innerslot = new ui.Slot do $('div', do @slot.getContentNode).first, do $('h1', do @slot.getContentNode).first
	
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
