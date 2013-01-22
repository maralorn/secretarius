model = require 'jsonmodel'
ui = require 'ui'

iced = require 'myiced'
iced.util.pollute window

exports.InfoView = class InfoView extends ui.View

	constructor: (@slot, match) ->
		@context = do @slot.getContentNode
		@id = match[1]
		@slot.setContent do require "template/infoframe"
		@contentNode = $('.infocontent', @context)
		$(".setStatus > a", @context).click (ev) ->
			info.setStatus ( -> return), $(this).attr("href")
			return false
#		$(".setStatus > a[href='#{@info.status}']", context).addClass("button-selected")
#		$("form.delay > input.date", context).datepicker({dateFormat: "dd.mm.yy"})
#		$("form.delay", context).submit ->
#			date = $(".date", @).val()
#			unless date == ''
#				regex=/(\d{2})\.(\d{2})\.(\d{4})/
#				[date, day, month, year] = regex.exec date
#				min = $(".minute", @).val()
#				hour = $(".hour", @).val()
#				date = new Date(year, parseInt(month)-1, day, parseInt(hour)+1, min)
#				info.setDelay (-> return), date
#			return false
		@refContainer = $(".referenceContainer", @context)
#		$(".references", context).droppable
#			drop: (event, ui) =>
#				info = ui.draggable.data("dragobject").getInformation()
#				if info?
#					@info.addReference (-> return), info

		await model.cache.getInformation c(defer @info), @id
		@info.onChanged @draw
		@info.onDeleted @slot.clear
		info = @info

		do @initContent
		do @draw

	delete: ->
		@info.removeCb 'changed', @draw

	draw: =>
		do @drawTitle
		do @drawFrame
		do @drawContent
	
	dirty: =>
		@dirtStamp = do new Date().getTime
		setTimeout @clean, 2000
	
	clean: =>
		
		if do new Date().getTime - @dirtStamp >= 2000
			do @save
	
	drawFrame: ->
		do @refContainer.empty
		for referenceid in @info.references
			await ui.id2viewname c(defer viewname), referenceid
			await ui.label c(defer label), viewname
			domnode = $(require("template/infolabel") label)
			domnode.appendTo @refContainer
			new Emitter domnode, viewname
		
class NoteView extends InfoView
	@registerView /^note:(.*)$/, this, func (autocb, match) ->
		await model.cache.getInformation defer(note), match[1]
		note.content

	drawTitle: ->
		@slot.setTitle 'Note'
	
	drawContent: ->
		@area.val @info.content
		await setTimeout defer(), 1
		@area.trigger 'autosize'
		
	initContent: ->
		@contentNode.html do require 'template/note'
		@area = $('textarea', @contentNode)
		@area.autosize
			append: '\n'
		@area.keyup @dirty

	save: ->
		unless @info.content is do @area.val
			await @info.setContent defer(error), do @area.val
			if error?
				console.log 'save failed'
			else
				console.log 'saved'
