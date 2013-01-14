require "lib/jquery"
require "lib/jquery-ui"
require "lib/jade"
slots = require "slots"

$ ->
	if /window/.test document.URL
		window.open "/", "mywindow","width=400,height=200,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no,resizable=no"
		console.log "a"
		window.open('', '_self', '')
		window.close()
		console.log "b"
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
