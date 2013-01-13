{View, Draggable} = require("view")
{ViewSlot} = require("slots")
{InfoView} = require("info")

class InboxViewSlot extends ViewSlot
	constructor: (@title, @content) ->
		

class InboxView extends View
	constructor: (@viewslot) ->
		@inbox = window.model.inbox
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
		await @inbox.get defer(error, {size: @size, first: @info})
		if error? then alert(error); return
		@draw()
		if @info?
			InfoView.create @infoslot, @info

exports.InboxDraggable = class InboxDraggable extends Draggable

	createView: (viewslot) ->
		new InboxView(viewslot)
