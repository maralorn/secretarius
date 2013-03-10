ui = require './ui'

exports.InfoView = class InfoView extends ui.View

	constructor: (_, @slot, match) ->
		@context = do @slot.getContentNode
		@id = match[1]
		@slot.setContent do require "./template/infoframe"
		@contentNode = $('.infocontent', @context)
		@info = model.cache.getInformation _, @id
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
	@registerView /^note:(.*)$/, this, (_, match) -> "Note: #{model.cache.getInformation(_, match[1]).content}"

	drawTitle: ->
		@slot.setTitle 'Note'
	
	drawContent: (_) ->
		@area.val @info.content
		setTimeout _, 1
		@area.trigger 'autosize'
		
	initContent: ->
		@contentNode.html do require './template/note'
		@area = $('textarea', @contentNode)
		@area.autosize
			append: '\n'
		@area.keyup @dirty
		@area.change =>
			do @dirty
			@clean true

	save: (_) ->
		unless @info.content is do @area.val
			msg = ui.message 'Saving…'
			@info.setContent _, do @area.val
			if error?
				msg.html 'Save failed!'
			else
				msg.html 'Saved!'

class AsapListView extends InfoView
	@registerView /^asaplist:(.*)$/, this, (_, match) ->
		"ToDo List: #{model.cache.getInformation(_, match[1]).name}"

	drawTitle: ->
		@slot.setTitle @info.name

	drawContent: (_) ->
		@newname.val @info.name
		model.Asap.getAllIDs _
		@list.setList @info.asaps

	initContent: ->
		@contentNode.html do require './template/asaplist'
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
			entry = $(require('./template/listentry')())
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
				((_) ->
					do ev.preventDefault
					asap.setDescription _, descinput.val()
					do descFlippable.showFront)()
			descFlippable = new ui.Flippable desclabel, descform, 0
			descFlippable.addToggler desclabel
			last = $('.last', entry)
			create = $('.create', entry)
			project = $('.project', entry)
			new ui.DropArea project, (viewname, _) ->
				if (id = /project:(.*)$/.exec(viewname)?[1])?
					parent =  model.cache.getInformation _, id
					if parent?
						asap.setParent (->), parent
			$('td > button[name=delete]', entry).click -> (asap.setStatus (->), 'delete' if confirm 'Really delete?')
			delparent = -> asap.setParent (->), null
			asap.onChanged set = (asap, _) ->
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
				parent = model.cache.getInformation _, asap.parent
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
		super node, (autocb, task) ->
			entry = $(require("./template/#{task.type}")())
			$('button[name=delete]', entry).click -> (task.setStatus (->), 'delete' if confirm 'Really delete?')
			donebox = $('input[name=completed]', entry)
			donebox.click -> if donebox.prop('checked') then task.done (->) else task.undo (->)
			switch task.type
				when 'project'
					collapsebutton = $('button.collapse', entry)
					collapsebutton.click (ev) ->
						do ev.preventDefault
						if task.collapsed
							task.uncollapse (->)
						else
							task.collapse (->)
					childrenList = new TaskList $('.children', entry)
					desclabel = $('form > span.name', entry)
					descinput = $('form > input', entry)
					descform = $('form', entry)
					descform.submit (ev) ->
						((_) ->
							if descFlippable.flipped
								task.setDescription _, descinput.val()
							do descFlippable.toggle)()
						false
					descFlippable = new ui.Flippable desclabel, descinput
					draw = (project) ->
						collapsebutton.html if project.collapsed then '>' else 'v'
						childrenList.setList if project.collapsed or not project.children? then [] else project.children
						desclabel.html project.description
						descinput.val project.description
					new ui.DropArea $('.projecthandle', entry), (viewname, _) ->
						if (id = /(asap|project):(.*)$/.exec(viewname)?[2])?
							child = model.cache.getInformation _, id
							if child?
								child.setParent _, task
					new ui.Emitter(desclabel).setViewName "project:#{task.id}"
				when 'asap'
					$('span.description', entry).html ui.createInfoButton task
					listid = null
					draw = (asap, _) ->
						if listid isnt asap.asaplist and asap.asaplist?
							listid = asap.asaplist
							list = model.cache.getInformation _, listid
							$('span.list', entry).html ui.createInfoButton list
			drawboth = (task) ->
				donebox.prop 'checked', task.completed?
				if task.active and not task.completed?
					entry.removeClass 'inactive'
				else
					entry.addClass 'inactive'
				if task.parent?
					entry.addClass 'hasparent'
				else
					entry.removeClass 'hasparent'


			task.onChanged draw
			task.onChanged drawboth
			draw task
			drawboth task
			entry

class TaskView extends InfoView
	drawContent: ->
	initContent: ->
		@contentNode.html require('./template/taskview')()
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
		new ui.DropArea $('.root', @contentNode), (viewname, _) ->
			if (id = /(asap|project):(.*)$/.exec(viewname)?[2])?
				child model.cache.getInformation _, id
				unless error? or not child?
					child.setParent (->), null
		new TaskList($('.tasklist', @contentNode)).setList [@info.id]

class ProjectView extends TaskView
	@registerView /^project:(.*)$/, this, (_, match) ->
		"Project: #{model.cache.getInformation(_, match[1]).description}"

	drawTitle: ->
		@slot.setTitle "Project: #{@info.description}"

class AsapView extends InfoView
	@registerView /^asap:(.*)$/, this, (_, match) ->
		"ToDo: #{model.cache.getInformation(_, match[1]).description}"

	drawTitle: ->
		@slot.setTitle "To Do"

class ProjectsView extends ui.View
	@registerView /^projects$/, this, (_) -> 'Projects'

	constructor: (@slot) ->
		@contentNode = @slot.getContentNode()
		@slot.setTitle "Projects"
		@contentNode.html require('./template/taskview')()
		@contentNode.append creator = $('<div/>')
		new ui.ProjectCreator creator
		@contentNode.append creator = $('<div/>')
		new ui.AsapCreator creator
		@contentNode.append creator = $('<div/>')
		new ui.AsapListCreator creator
		@contentNode.addClass 'hideinactive hidechildren'
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
		@projectList = new TaskList $('.tasklist', @contentNode)
		new ui.DropArea $('.root', @contentNode), (viewname, _) ->
			if (id = /(asap|project):(.*)$/.exec(viewname)?[2])?
				child = model.cache.getInformation _, id
				if child?
					child.setParent _, null
		model.Project.getAllIDs catchNull @projectList.setList
		model.Project.onChanged @projectList.setList

	delete: ->
