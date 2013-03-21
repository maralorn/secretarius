require './vendor/jquery'
require './vendor/jquery.autosize'
require './vendor/date.extensions'
ko = require './vendor/knockout'
sec = require 'libsecretarius'
util = sec.util
model = sec()


defaultTo = (obj, defaults) ->
	for key, value of defaults
		obj[key] = value unless obj[key]?

id2viewname = (_, id) ->
	info2viewname model.cache.getInformation _, id
	
viewname2info = (_, viewname) ->
	if (id = /^\w*\/(.*)$/.exec(viewname)?[1])?
		model.cache.getInformation _, id
	else
		throw new Error "No Infoview Name: #{viewname}"

info2label = (_, info) ->
	label _, info2viewname info
	
info2viewname = (info) ->
	"#{info.type}/#{info.id}"

id2label = (_, id) ->
	id2viewname _, id
	label _, viewname

label = (_, viewname) ->
	View.getLabel _, viewname

class ViewModel
	constructor: (_) ->
		@_connections = []
		
	connect: (_, obj, event, callback) ->
		cb = (data) -> ((_) =>
			callback _, data) util.dummyCB
		cb.event = event
		cb.obj = obj
		@_connections.push cb
		obj.on event, cb
			
		
class View
	_views = []

	@registerView: (regex, cls, label) ->
		_views.push
			regex: regex
			cls: cls
			label: label
	
	@getLabel: (_, viewname) ->
		[row, params] = @_find viewname
		if row?.label?
			row.label _, params
		else
			viewname

	@create: (viewname, slot) ->
		[row, params] = @_find viewname
		new row.cls slot, params if row?

	@_find: (viewname) ->
		for row in _views
			params = row.regex.exec viewname
			return [row, params] if params?
		[null, null]

	@test: (viewname) ->
		@_find(viewname)[0]?

class DropArea
	constructor: (contentNode, cb) ->
		contentNode.bind 'dragover', (ev) -> do ev.originalEvent.preventDefault
		contentNode.bind 'drop', (ev) ->
			do ev.originalEvent.preventDefault
			cb ev.originalEvent.dataTransfer.getData 'text/plain'

Slot = class Slot
	constructor: (@contentNode, @titleNode) ->
		@emitter = new Emitter do @getTitleNode
		do @clear

	setView: (viewname) =>
		if View.test viewname
			do @clear
			@view = View.create viewname, this
			@emitter.setViewName viewname

	setTitle: (title) ->
		@getTitleNode().html title
		
	setContent: (html) ->
		@getContentNode().html html

	getContentNode: ->
		@contentNode

	getTitleNode: ->
		@titleNode

	clear: =>
		do @view?.delete
		do @getContentNode().empty
		@setTitle 'Secretarius'

exports.Emitter = class Emitter
	constructor: (@node, @slotGenerator) ->
		@slotGenerator ?= do SlotGenerator.getDefault
		@node.attr 'draggable', 'true'
		@node.bind 'dragstart', (ev) =>
			ev.originalEvent.dataTransfer.setData 'text/plain', do @getViewName
			ev.originalEvent.dataTransfer.setData 'text/uri-list', "http://#{window.location.origin}##{@getViewName()}"
		@node.click =>
			@slotGenerator.show do @getViewName
	
	setViewName: (@viewName) ->

	getViewName: ->
		@viewName
		
exports.SlotGenerator = class SlotGenerator
	_default = null
	@setDefault: (generator) ->
		_default = generator
	@getDefault: ->
		_default

class WindowSlotGenerator extends SlotGenerator
	show: (viewname) ->
		win.setView window.location.hash = viewname
		
	@setDefault new this

class NewWindowSlotGenerator extends SlotGenerator
	show: (viewname) ->
		window.open "#{window.location.origin}##{viewname}", '', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no'

class WindowSlot extends Slot
	constructor: (_) ->
		@msg = ko.observableArray()
		@clock = ko.observable ''
		do clock = (_) =>
			setTimeout (=> clock util.dummyCB), 1000 - (new Date().getTime() % 1000)
			@clock "#{new Date().toLocaleString()} Inbox:#{model.inbox.getSize _}"
		
	###		
		menu = ['','inbox', 'projects']
		labels = {}
		for dish in menu
			labels[dish] = label null, dish
#		$('body').html require('./template/body') {menu: (labels[dish] _ for dish in menu)}
		new AsapListsList $('#menu')
		for dish in menu
			emitter = new Emitter $("#menu > button:contains('#{labels[dish]}')")
			emitter.setViewName dish
		$clock = $('#clock')
		do $clock.hide
		clock = ->
			do runclock
			$('.reltime').each ->
				node = $(this)
				node.html new Date(node.attr 'x-time').toRelativeTime
					nowThreshold: 1000
			try
				do $clock.show
				$clock.html "#{new Date().toLocaleString()} Inbox:#{model.inbox.values.size}"
			catch err
				do $clock.hide
		do runclock = -> setTimeout clock, 1000 - do new Date().getTime % 1000
		super $('#content'), do $('#header > h1').first
		WindowSlot.__super__.setView.call this, viewname
		new DropArea do $('#header > h1').first, @setView
###
	showMessage: (_, msg, timeout = 5000) ->
		@msg.push msg
		setTimeout (=> do @msg.shift), timeout
###		
		
	setTitle: (title) ->
		super
		document.title = "#{title} - Secretarius"

	close: ->
		 window.open '', '_self', ''
		 do window.close
exports.ContainerViewSlot = class ContainerViewSlot extends Slot
	constructor: (@container) ->
		@id = @container.attr "id"
		@container.data "slot", @
		@draw()

	draw: ->
		@container.html require("./template/container").render()
		@title = $ "##{@id} > h1"
		@content = $ "##{@id} > div"
		@title.droppable
			drop: (event, ui) => draggable.data("dragobject").createView(@)

	fixTitleLayout: =>
		height = @title.height() + 13
		@content.css("padding-top", height)
		@content.css("height", @content.parent().innerHeight() - height - 6)
		

exports.TabViewSlot = class TabViewSlot extends Slot
	constructor: ->
		@id = "Tab#{Math.floor Math.random() * 1000000000000000}"
		$("#tabs > ul").append require("./template/tabtitle").render
			id: @id
		$("#tabs").append require("./template/tab").render
			id: @id
		$("#tabs").tabs("refresh")
		@title = $ "#tabs > ul > li > a[href='##{@id}']"
		@content = $ "##{@id}"
		$("#tabs > ul > li > a[href='#close#{@id}']").click =>
			@destroy()
			false
		@content.data "slot", @

	destroy: ->
		@title.parent().remove()
		@content.remove()

	clear: ->
		@title.html "Empty"
		@content.html ""

	getHeader: ->
		@title.parent()
###

exports.Flippable = class Flippable
	constructor: (@front, @back) ->
		@flipped = false
		@back?.addClass 'backside'
	
	showBack: =>
		@front?.addClass 'backside'
		@back?.removeClass 'backside'

	showFront: =>
		@front?.removeClass 'backside'
		@back?.addClass 'backside'

	toggle: =>
		if @flipped = not @flipped
			do @showBack
		else
			do @showFront

	addToggler: (toggler) ->
		toggler.click =>
			do @toggle
			false

exports.Uploader = class Uploader
	defaults =
		upload: -> return
		name: 'File'

	constructor: (@node, @options = {}) ->
		defaultTo @options, defaults
#		@node.html require('./template/upload') @options
		links = $('button', @node)
		flip = new Flippable do links.first, $('form', @node)
		flip.addToggler links

exports.TimePicker = class TimePicker
	units =
		year: 'FullYear'
		month: 'Month'
		day: 'Date'
		minute: 'Minutes'
		hour: 'Hours'
		second: 'Seconds'
	defaults =
		change: ->
		name: 'Time'

	constructor: (@node, @options) ->
		defaultTo @options, defaults
#		@node.html require('./template/timepicker') @options
		@node.addClass 'timepicker'
		@outerFlip = new Flippable $('.front', @node), $('.back', @node), 0
		@innerFlip = new Flippable $('.front > button', @node), $('.front > span', @node), 0
		@outerFlip.addToggler $('button', @node)
		@display = $('span.reltime', @node)
		for unit of units
			this[unit] = $("input[name='#{unit}']", @node)
		@setDate @options.date
		$('button[name=delete]', @node).click =>
			@options.change null
			@setDate null
			false
		$('button[name=save]', @node).click =>
			do @save
			false

	setDate: (@date) =>
		date = @date
		if @date?
			do @innerFlip.showBack
		else
			do @innerFlip.showFront
			date = new Date
		@display.attr 'x-time', date
		for unit, fn of units
			this[unit].val do date["get#{fn}"] + if unit is 'month' then 1 else 0

	save: =>
		date = new Date
		try
			for unit, fn of units
				date["set#{fn}"] do this[unit].val - if unit is 'month' then 1 else 0
		catch error
			date = null
		@options.change date
		@setDate date
		
	getDate: =>
		@date

ListManager = class ListManager
	constructor: (_, @creator) ->
		@array = ko.observableArray()
		
	setList: (_, list) =>
		ids = (item.id for item in @array())
		for id in list when id not in ids
			@array.push @creator _, id
		@array.remove (item) -> not item.id in list
		@array.sort (lhs, rhs) ->
			diff = list.indexOf(rhs.id) - list.indexOf(lhs.id)
			if diff < 0
				-1
			else if diff > 0
				1
			else
				0


exports.InfoListManager = class InfoListManager extends ListManager
	constructor: (_, node, creator) ->
		super _, node, (_, id) ->
			info = model.cache.getInformation _, id
			if info?
				creator _, info

exports.createInfoButton = createInfoButton = (info, type = false, del) ->
#	domnode = $(require('./template/infobutton') del: del?)
	labelnode = $('.label', domnode)
	if del? then $('button', domnode).click (ev) ->
		do ev.preventDefault
		do ev.stopPropagation
		del info
	info.onChanged setLabel = (info, _) ->
		label = exports.info2label _, info
		label = (label.split ':')[1..].join ':' unless type
		labelnode.html label
	setLabel info
	emitter = new Emitter domnode
	emitter.setViewName exports.info2viewname info
	domnode

exports.InfoList = class InfoList extends InfoListManager
	constructor: (_, node, type=false, del) ->
		super _, node, (_, reference) ->
			createInfoButton reference, type, del

exports.ReferenceList = class ReferenceList extends InfoList
	constructor: (_, node, info) ->
		new DropArea node, (viewname, _) ->
			if (id = /^\w*:(.*)$/.exec(viewname)?[1])?
				reference = model.cache.getInformation _, id
				if reference?
					info.addReference _, reference
		super _, node, true, (reference) -> info.removeReference (->), reference

exports.InfoClassListManager = class InfoClassListManager extends InfoListManager
	constructor: (_, node, cls, creator) ->
		super _, node, creator
		cls.onChanged @setList
		@setList cls.getAllIDs _
		
exports.AsapListsList = class AsapListsList extends InfoClassListManager
	constructor: (_, node) ->
		super _, node, model.AsapList, (_, list) ->
			listnode = $("<button>#{list.name}</button>")
			list.onChanged (list) -> listnode.html list.name
			new Emitter(listnode).setViewName "asaplist:#{list.id}"
			listnode


exports.InfoClassPicker = class InfoClassPicker extends InfoClassListManager
	
	constructor: (node, cls, defaultoption, cb) ->
		@select = null
		@picker = $('<select />')
		node.append @picker
		if defaultoption?
			@picker.append $(new Option defaultoption, '')
		super @picker, cls, cb
	
	sel: (id) ->
		@select = id
		if id of @elements
			@elements[id].prop 'selected', true

	getInfo: (_) ->
		model.cache.getInformation _, @picker.val()
		
	onChanged: (_) ->
		@picker.change _
		@getInfo _

exports.ProjectPicker = class ProjectPicker extends InfoClassPicker
	constructor: (node) ->
		super node, model.Project, 'No Project', (_, project) ->
			projectnode = $(new Option project.description, project.id)
			project.onChanged (project) -> projectnode.html project.description
			projectnode

exports.ListPicker = class ListPicker extends InfoClassPicker
	constructor: (node) ->
		super node, model.AsapList, null, (_, list) ->
			listnode = $(new Option list.name, list.id)
			list.onChanged (list) -> listnode.html list.name
			listnode

exports.AsapListCreator = class AsapListCreator
	constructor: (node) ->
#		node.html require('./template/asaplistcreator')()
		list = $('input[name=list]', node)
		$('form[name=list]').submit (ev) ->
			do ev.preventDefault
			new model.AsapList().create ((error) -> list.val '' unless error?), list.val()
	

exports.NoteCreator = class NoteCreator
	constructor: (node) ->
#		node.html require('./template/notecreator')()
		content = $('input[name=note]', node)
		$('form[name=note]', node).submit (ev) ->
			do ev.preventDefault
			new model.Note().create ((error) -> content.val '' unless error?), content.val()

exports.AsapCreator = class AsapCreator
	constructor: (node, @list=null, @project=null, @reference=null) ->
#		node.append form = $(require('./template/asapcreator')
#			list: !(@list?)
#			project: !(@project?))
		desc = $('input[name=asap]')
		projectPicker = new ProjectPicker $('.projectsel', node)
		listPicker = new ListPicker $('.listsel', node)
		form.submit =>
			((_) =>
				project = if @project? then @project else projectPicker.getInfo _
				list = if @list? then @list else listPicker.getInfo _
				new model.Asap().create _, desc.val(), list, @reference, project
				desc.val '')()
			false
		
	setList: (@list) ->
	setProject: (@project) ->
	setReference: (@reference) ->
		
exports.ProjectCreator = class ProjectCreator
	constructor: (@node, @parent=null, @reference=null) ->
#		node.append form = $(require('./template/projectcreator')
#			parent: !(@parent?))
		desc = $('input[name=project]')
		parentPicker = new ProjectPicker $('.parentpicker', node)
		form.submit =>
			((_) =>
				parent = if @parent? then @parent else parentPicker.getInfo _
				new model.Project().create _, desc.val(), @reference, parent
				desc.val '')()
			false
	setParent: (@parent) ->
	setReference: (@reference) ->
		
	
class InboxView extends View
	@registerView /^inbox$/, this, (_) -> 'Inbox'

	constructor: (_, @slot) ->
		@size = @first = null
		@context = @slot.getContentNode()
#		@slot.setContent do require "./template/inbox"
		@innerslot = new Slot do $('.inboxinfo', do @slot.getContentNode).first, do $('h1', do @slot.getContentNode).first
		model.inbox.onChanged @draw
		model.inbox.get (err, values) => unless err? then @draw values
		innerFlip = new Flippable $('.newasap', @context), $('.newproject', @context), 0
		outerFlip = new Flippable $('.front', @context), $('.back', @context), 500
		outerFlip.addToggler $('.front > button', @context)
		outerFlip.addToggler $('.back > button', @context)
		$('button[name=asap]', @context).click innerFlip.showFront
		$('button[name=project]', @context).click innerFlip.showBack
		@asapCreator = new AsapCreator $('.newasap', @context)
		@projectCreator = new ProjectCreator $('.newproject', @context)

	delete: ->
		model.inbox.removeCb 'changed', @draw

	draw: (values) =>
		unless @size is values.size
			@slot.setTitle "Inbox (#{@size = values.size})"
		unless @first is values.first
			@first = values.first
			@asapCreator.setReference @first
			@projectCreator.setReference @first
			if @first?
				@innerslot.setView "#{@first.type}:#{@first.id}"
			else
				do @innerslot.clear

class InfoView extends View
	constructor: (_, @slot, match) ->
		@context = do @slot.getContentNode
		@id = match[1]
#		@slot.setContent do require "./template/infoframe"
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
		@delayPicker = new TimePicker $('.delay'),
			name: 'Delay'
			change: (date) => info.setDelay (->), date
		@savebutton.click (ev) =>
			do ev.preventDefault
			@clean true
		new Uploader $('.upload', @context)
		@refManager = new ReferenceList $('.references', @context), @info
		do @initContent
		do @draw
		new Flippable($('.options', @context), null).addToggler $('button[name=options]', @context)

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
#		@contentNode.html do require './template/note'
		@area = $('textarea', @contentNode)
		@area.autosize
			append: '\n'
		@area.keyup @dirty
		@area.change =>
			do @dirty
			@clean true

	save: (_) ->
		unless @info.content is do @area.val
			msg = message 'Saving…'
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
#		@contentNode.html do require './template/asaplist'
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
		new AsapCreator $('.newtodo', @contentNode), @info

		@list = new InfoListManager $('tbody', @contentNode), (autocb, asap) =>
#			entry = $(require('./template/listentry')())
			refManager = new ReferenceList $('.refs', entry), asap
			delayPicker = new TimePicker $('.delay', entry),
				name: ''
				change: (date) -> asap.setDelay (->), date
			deadlinePicker = new TimePicker $('.deadline', entry),
				name: ''
				change: (date) -> asap.setDeadline (->), date
			listPicker = new ListPicker $('td.listsel', entry)
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
			descFlippable = new Flippable desclabel, descform, 0
			descFlippable.addToggler desclabel
			last = $('.last', entry)
			create = $('.create', entry)
			project = $('.project', entry)
			new DropArea project, (viewname, _) ->
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
				project.html if parent? then createInfoButton parent, false, delparent else ''
				delayPicker.setDate if asap.delay? then new Date asap.delay else null
				deadlinePicker.setDate if asap.deadline? then new Date asap.deadline else null
				last.attr 'x-time', asap.lastEdited
				create.attr 'x-time', asap.createdAt
				listPicker.sel asap.asaplist
			set asap
			entry

class TaskList extends InfoListManager
	constructor: (node) ->
		super node, (autocb, task) ->
#			entry = $(require("./template/#{task.type}")())
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
					descFlippable = new Flippable desclabel, descinput
					draw = (project) ->
						collapsebutton.html if project.collapsed then '>' else 'v'
						childrenList.setList if project.collapsed or not project.children? then [] else project.children
						desclabel.html project.description
						descinput.val project.description
					new DropArea $('.projecthandle', entry), (viewname, _) ->
						if (id = /(asap|project):(.*)$/.exec(viewname)?[2])?
							child = model.cache.getInformation _, id
							if child?
								child.setParent _, task
					new Emitter(desclabel).setViewName "project:#{task.id}"
				when 'asap'
					$('span.description', entry).html createInfoButton task
					listid = null
					draw = (asap, _) ->
						if listid isnt asap.asaplist and asap.asaplist?
							listid = asap.asaplist
							list = model.cache.getInformation _, listid
							$('span.list', entry).html createInfoButton list
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
#		@contentNode.html require('./template/taskview')()
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
		new DropArea $('.root', @contentNode), (viewname, _) ->
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

class ProjectsView extends View
	@registerView /^projects$/, this, (_) -> 'Projects'

	constructor: (@slot) ->
		@contentNode = @slot.getContentNode()
		@slot.setTitle "Projects"
#		@contentNode.html require('./template/taskview')()
		@contentNode.append creator = $('<div/>')
		new ProjectCreator creator
		@contentNode.append creator = $('<div/>')
		new AsapCreator creator
		@contentNode.append creator = $('<div/>')
		new AsapListCreator creator
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
		new DropArea $('.root', @contentNode), (viewname, _) ->
			if (id = /(asap|project):(.*)$/.exec(viewname)?[2])?
				child = model.cache.getInformation _, id
				if child?
					child.setParent _, null
		model.Project.getAllIDs catchNull @projectList.setList
		model.Project.onChanged @projectList.setList

	delete: ->

class InboxView extends View
	@registerView /^$/, this, (_) -> 'Secretarius'

	constructor: (@slot) ->
#		@slot.setContent require('./template/main')()
		new NoteCreator $('.newnote', @contentNode)
		new AsapListsList $('.lists', @contentNode)
		new AsapListCreator $('.newlist', @contentNode)
	
	delete: ->

win = new WindowSlot _
#win.setView document.location.hash
$ ->
	ko.applyBindings win

win.showMessage _, 'Hallo'
setTimeout _, 1000
win.showMessage _, 'Du'
setTimeout _, 1000
win.showMessage _, 'Bist'
setTimeout _, 1000
win.showMessage _, 'Aber'
setTimeout _, 1000
win.showMessage _, 'Komisch'

