{View, Draggable} = require("view")
{ViewSlot} = require("slots")
{InfoView} = require("info")

class InboxViewSlot extends ViewSlot
	constructor: (@title, @content) ->
		

class InboxView extends View
	constructor: (@viewslot) ->
		@inbox = new (window.model.Inbox)
		@draw()

	drawTitle: ->
		@viewslot.setTitle "Inbox (#{@inbox.size()})"

	draw: ->
		@drawTitle()
		@viewslot.setContent require("template/inbox").render()
		new InboxDraggable @viewslot.getHeader()
		@infoslot = new InboxViewSlot $("h1", @viewslot.getContentNode()), $(".inboxcontent", @viewslot.getContentNode())
		$(".buttons", @viewslot.getContentNode()).buttonset()
		$(".buttons", @viewslot.getContentNode()).buttonset()
		$("a[href='#read']", @viewslot.getContentNode()).click =>
#			@info?.setStatus("default")
			@newInfo()
			false
		@newInfo()
	
	newInfo: ->
		await @inbox.getFirst defer @info
		InfoView.create @infoslot, @info

exports.InboxDraggable = class InboxDraggable extends Draggable

	createView: (viewslot) ->
		new InboxView(viewslot)
