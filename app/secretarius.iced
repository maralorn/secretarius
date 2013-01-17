require "lib/jquery"
require "lib/jade"

{WindowSlot} = require 'slots'
model = require 'jsonmodel'

$ ->
	slot = new WindowSlot()
	if (request = document.URL.match(/https?:\/\/.*\/(.*)/)?[1])?
		slot.setView request
	await model.inbox.getFirst defer error, first
	console.log first
	first.onChanged (data) -> console.log data
	

	
#	if /window/.test document.URL
#		window.open "/", "mywindow","width=400,height=200,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no,resizable=no"
#		window.open('', '_self', '')
#		window.close()
	
#	new (require("inbox").InboxDraggable)($("#menu > button:contains('Inbox')"))
#	new (require("create").CreateNoteDraggable)($("#menu > button:contains('New Note')"))
#	$("#menu").buttonset()
#	$("#menu > button").button()
#	$("#tabs").tabs()
#	$("#tabs > ul").droppable
#		drop: (event, ui) ->
#			ui.draggable.data("dragobject").createView(new slots.TabViewSlot())
#	for container in $(".container")
#		new (slots.ContainerViewSlot)($(container))
	
#	$(window).resize(-> $(".container").each(-> $(@).data("slot").fixTitleLayout()))
#	$(window).resize()
