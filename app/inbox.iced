model = require 'jsonmodel'
iced = require 'myiced'
iced.pollute window
ui = require 'ui'

class InboxViewSlot extends Slot
	constructor: (@title, @content) ->
		

class InboxView extends View
	constructor: (@viewslot) ->
		@inbox = model.inbox
		@inbox.onChanged => @newInfo()
		@newInfo()

	drawTitle: ->
		@viewslot.setTitle "Inbox (#{@size})"

	draw: ->
		@drawTitle()
		@viewslot.setContent require("template/inbox").render()
		new InboxDraggable @viewslot.getHeader()
		@infoslot = new InboxViewSlot $("h1", @viewslot.getContentNode()), $(".inboxcontent", @viewslot.getContentNode())
		if @size is 0
			$("a[href='#read']", @viewslot.getContentNode()).hide()
		else
			$("a[href='#read']", @viewslot.getContentNode()).click =>
				@info?.setStatus "default"
				return false

	newInfo: ->
		await @inbox.get defer error, res
		if error? then alert(error); return
		@size = res.size
		@info = res.first
		@draw()
		if @info?
			InfoView.create @infoslot, @info
