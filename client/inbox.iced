{View, Draggable} = require("view")
{ViewSlot} = require("slots")
{InfoView} = require("info")

class InboxViewSlot extends ViewSlot
	constructor: (@title, @content) ->
		

class InboxView extends View
	constructor: (@viewslot) ->
		@inbox = new (window.model.Inbox)
		@newInfo()

	drawTitle: ->
		await @inbox.size defer error, size
		@viewslot.setTitle "Inbox (#{size})"

	draw: ->
		@drawTitle()
		@viewslot.setContent require("template/inbox").render()
		new InboxDraggable @viewslot.getHeader()
		@infoslot = new InboxViewSlot $("h1", @viewslot.getContentNode()), $(".inboxcontent", @viewslot.getContentNode())
		await @inbox.size defer error, size
		if size is 0
			$("a[href='#read']", @viewslot.getContentNode()).hide()
		else
			$("a[href='#read']", @viewslot.getContentNode()).click =>
				await @info?.setStatus "default", defer error
				alert error if error?
				@newInfo()
				false
	
	newInfo: ->
		@draw()
		await @inbox.getFirst defer error, @info
		if @info?
			InfoView.create @infoslot, @info

exports.InboxDraggable = class InboxDraggable extends Draggable

	createView: (viewslot) ->
		new InboxView(viewslot)
