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
		await @info.get defer()
		@draw()
		@info.onChanged => @draw()

	draw: ->
		@viewslot.setTitle @title()
		@drawContent()
	
	drawContent: ->
		info = @info
		@viewslot.setContent require("template/infoframe").render()
		context = @viewslot.getContentNode()
		$(".setStatus > a", context).click (ev) ->
			ev.preventDefault()
			info.setStatus ( -> return), $(@).attr("href")
		$(".setStatus", context).buttonset()
		$(".setStatus > a[href='#{@info.status}']", context).addClass("button-selected")
		$("form.delay > input.date", context).datepicker({dateFormat: "dd.mm.yy"})
		$("form.delay", context).submit ->
			date = $(".date", @).val()
			unless date == ''
				regex=/(\d{2})\.(\d{2})\.(\d{4})/
				[date, day, month, year] = regex.exec date
				min = $(".minute", @).val()
				hour = $(".hour", @).val()
				date = new Date(year, parseInt(month)-1, day, parseInt(hour)+1, min)
				info.setDelay (-> return), date
			return false
		$(".infocontent", context).html @content()
		for referenceid in @info.references
			model.getInformation referenceid, (error, reference) ->
				domnode = $(require("template/infolabel").render infolabel reference)
				domnode.appendTo $(".references", context)
				new InfoDraggable domnode, reference
		$(".references", context).droppable
			drop: (event, ui) =>
				info = ui.draggable.data("dragobject").getInformation()
				if info?
					@info.addReference (-> return), info

class NoteView extends InfoView
	title: ->
		"Note"
	
	content: ->
		@info.content

viewByType =
	note: NoteView
