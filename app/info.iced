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
		await model.cache.getInformation defer(error, @info), @id
		@info.onChanged @draw
		@info.onDeleted @delcb = => do @slot.setView ''
		info = @info
		$(".setStatus > button", @context).click (ev) ->
			do ev.preventDefault
			status = $(this).attr 'name'
			unless status is 'delete' and not confirm 'Really delete?'
				info.setStatus (->), status
		do (@savebutton = $('button[name=save]', @context)).hide
		@delayPicker = new ui.TimePicker $('.delay'),
			name: 'Delay'
			change: (date) => info.setDelay (->), date
		@savebutton.click (ev) =>
			do ev.preventDefault
			@clean true
		new ui.Uploader $('.upload', @context)
		@refManager = new ui.ReferenceList $('.references', @context), @info
		do @initContent
		do @draw
		new ui.Flippable($('.options', @context), null).addToggler $('button[name=options]', @context)

	delete: =>
		@info.removeCb 'changed', @draw
		@info.removeCb 'deleted', @delcb

	draw: =>
		do @drawTitle
		do @drawFrame
		do @drawContent
	
	dirty: =>
		@dirtStamp = do new Date().getTime
		@savebutton.show 400
		setTimeout @clean, 5000
	
	clean: (force) =>
		if @dirtStamp? and (do new Date().getTime - @dirtStamp >= 5000 or force)
			do @save
			@dirtStamp = null
			@savebutton.hide 1000
	
	drawFrame: ->
		$(".setStatus > button", @context).removeClass 'active'
		$(".setStatus > button[name=#{@info.status}]", @context).addClass 'active'
		$("span.created_at", @context).attr 'x-time', @info.createdAt
		$("span.last_edited", @context).attr 'x-time', @info.lastEdited
		@delayPicker.setDate if @info.delay? then new Date @info.delay else null
		@refManager.setList @info.references
		
class NoteView extends InfoView
	@registerView /^note:(.*)$/, this, func (autocb, match) ->
		await model.cache.getInformation defer(note), match[1]
		"Note: #{note.content}"

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
		@area.change =>
			do @dirty
			@clean true

	save: ->
		unless @info.content is do @area.val
			msg = ui.message 'Saving…'
			await @info.setContent defer(error), do @area.val
			if error?
				msg.html 'Save failed!'
			else
				msg.html 'Saved!'

class ProjectView extends InfoView
	@registerView /^project:(.*)$/, this, func (autocb, match) ->
		await model.cache.getInformation defer(project), match[1]
		"Project: #{project.description}"

class AsapView extends InfoView
	@registerView /^asap:(.*)$/, this, func (autocb, match) ->
		await model.cache.getInformation defer(asap), match[1]
		"ToDo: #{asap.description}"

class AsapListView extends InfoView
	@registerView /^asaplist:(.*)$/, this, func (autocb, match) ->
		await model.cache.getInformation defer(list), match[1]
		"ToDo List: #{list.name}"

	drawTitle: ->
		@slot.setTitle @info.name

	drawContent: ->
		@newname.val @info.name
		await model.Asap.getAllIDs defer(error, ids)
		@list.setList @info.asaps

	initContent: ->
		@contentNode.html do require 'template/asaplist'
		@contentNode.addClass 'hideinactive'
		active = true
		togglebutton = $('button[name=toggleshow]')
		togglebutton.click =>
			if active
				active = false
				togglebutton.html 'Show only active'
				@contentNode.removeClass 'hideinactive'
			else
				active = true
				togglebutton.html 'Show all'
				@contentNode.addClass 'hideinactive'
			false
		@newname = $('input[name=newname]', @contentNode)
		$('form', @contentNode).submit (ev) =>
			do ev.preventDefault
			@info.rename (->), @newname.val()
		new ui.AsapCreator $('.newtodo', @contentNode), @info

		@list = new ui.InfoListManager $('tbody', @contentNode), (autocb, asap) =>
			entry = $(require('template/listentry')())
			refManager = new ui.ReferenceList $('.refs', entry), asap
			delayPicker = new ui.TimePicker $('.delay', entry),
				name: ''
				change: (date) -> asap.setDelay (->), date
			deadlinePicker = new ui.TimePicker $('.deadline', entry),
				name: ''
				change: (date) -> asap.setDeadline (->), date
			listPicker = new ui.ListPicker $('td.listsel', entry)
			listPicker.onChanged (list) ->
				asap.setList (->), list
			donebox = $('input[type=checkbox]', entry)
			donebox.click -> if donebox.is(':checked') then asap.done (->) else asap.undo (->)
			desclabel = $('.desc > span', entry)
			descform = $('.desc > form', entry)
			descinput = $('.desc > form > input', entry)
			descform.submit (ev) ->
				do ev.preventDefault
				await asap.setDescription defer(error), descinput.val()
				do descFlippable.showFront unless error?
			descFlippable = new ui.Flippable desclabel, descform, 0
			descFlippable.addToggler desclabel
			last = $('.last', entry)
			create = $('.create', entry)
			project = $('.project', entry)
			new ui.DropArea project, (viewname) ->
				if (id = /project:(.*)$/.exec(viewname)?[1])?
					await model.cache.getInformation defer(error, parent), id
					unless error? or not parent?
						asap.setParent (->), parent
			$('td > button[name=delete]', entry).click -> (asap.setStatus (->), 'delete' if confirm 'Really delete?')
			delparent = -> asap.setParent (->), null
			asap.onChanged set = (asap) ->
				if asap.completed? or not asap.active
					entry.addClass('inactive')
				else
					entry.removeClass('inactive')
				if not asap.completed? and asap.overdue
					$('.deadline', entry).addClass 'overdue'
				else
					$('.deadline', entry).removeClass 'overdue'
				donebox.prop('checked', asap.completed?)
				desclabel.html asap.description
				descinput.val asap.description
				if asap.references?
					refManager.setList asap.references
				await model.cache.getInformation defer(error, parent), asap.parent
				project.html if parent? then ui.createInfoButton parent, false, delparent else ''
				delayPicker.setDate if asap.delay? then new Date asap.delay else null
				deadlinePicker.setDate if asap.deadline? then new Date asap.deadline else null
				last.attr 'x-time', asap.lastEdited
				create.attr 'x-time', asap.createdAt
				listPicker.sel asap.asaplist
			set asap
			entry

class TaskList extends ui.InfoListManager
	constructor: (node) ->
		
