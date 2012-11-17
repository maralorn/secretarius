require "lib/jquery"
require "lib/jquery-ui"
require "lib/jade"
slots = require "slots"

window.model = require("clientmodel").connect()

$ ->
	$("body").html(require("template/body").render())
	new (require("inbox").InboxDraggable)($("#menu > button:contains('Inbox')"))
	new (require("create").CreateNoteDraggable)($("#menu > button:contains('New Note')"))
	$("#menu").buttonset()
	$("#menu > button").button()
	$("#tabs").tabs()
	$("#tabs > ul").droppable
		drop: (event, ui) ->
			ui.draggable.data("dragobject").createView(new slots.TabViewSlot())
	for container in $(".container")
		new (slots.ContainerViewSlot)($(container))
	
	$(window).resize(-> $(".container").each(-> $(@).data("slot").fixTitleLayout()))
	$(window).resize()
