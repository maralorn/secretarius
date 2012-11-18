{View, Draggable} = require("view")

getViewByType = (type) ->
	view = viewByType[type]
	unless view? then console.log "Type not found: #{type}"
	return view

infolabel = (info) ->
	switch info.type
		when "note"
			return {infolabel: "Note: #{info.content}"}

class InfoDraggable extends Draggable
	constructor: (@DOMnode, @info) ->
		super(@DOMnode)
	
	createView: (viewslot) ->
		InfoView.create viewslot, @info

	getInformation: ->
		@info

exports.InfoView = class InfoView extends View
	@create: (viewslot, info) ->
		await info.getType defer error, type
		new (getViewByType type) viewslot, info
		
	constructor: (@viewslot, @info) ->
		new InfoDraggable @viewslot.getHeader(), @info
		@draw()
		@info.onChanged => @draw()

	draw: ->
		await @info.get defer()
		@viewslot.setTitle @title()
		@drawContent()
	
	drawContent: ->
		@viewslot.setContent require("template/infoframe").render()
		context = @viewslot.getContentNode()
		$(".setStatus > button.#{@info.status}").attr("disabled","disabled").addClass("button-selected")
		$(".setStatus", context).buttonset()
		$("form.delay > input.date", context).datepicker({dateFormat: "dd.mm.yy"})
		info = @info
		$("form.delay", context).submit ->
			date = $(".date", @).val()
			unless date == ''
				regex=/(\d{2})\.(\d{2})\.(\d{4})/
				[date, day, month, year] = regex.exec date
				min = $(".minute", @).val()
				hour = $(".hour", @).val()
				date = new Date(year, parseInt(month)-1, day, parseInt(hour)+1, min)
				info.setDelay date
			return false
		$(".infocontent", context).html @content()
		references = []
		await for referenceid in @info.references
			references.push reference = new (model.Information) referenceid
			reference.get defer error
		for reference in references
			domnode = $(require("template/infolabel").render infolabel reference)
			domnode.appendTo $(".references", context)
			new InfoDraggable domnode, reference
		$(".references", context).droppable
			drop: (event, ui) =>
				info = ui.draggable.data("dragobject").getInformation()
				if info?
					@info.addReference info

class NoteView extends InfoView
	title: ->
		"Note"
	
	content: ->
		@info.content

viewByType =
	note: NoteView
