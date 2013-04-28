require './vendor/jquery'
require './vendor/jquery.autosize'
require './vendor/date.extensions'
ko = require 'knockout'
ko.mapping = require './vendor/knockout.mapping'
sec = require 'libsecretarius'
util = sec.util
model = sec()

defaultTo = (obj, defaults) ->
	for key, value of defaults
		obj[key] = value unless obj[key]?

viewname2id = (viewname) ->
	/^\w*\/(.*)$/.exec(viewname)?[1]
	
id2viewname = (_, id) ->
	info2viewname model.cache.getInformation _, id
	
viewname2info = (_, viewname) ->
	if (id = viewname2id viewname)?
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

icon = (name) -> "<i class='icon-#{name}' />"

class KOModelStorage
	constructor: ->
		@models = {}
	
	getInfo: (_, id) ->
		unless id of @models
			@models[id] = @createInfoModel _, model.cache.getInformation _, id
		@models[id]

	getList: (_, name) ->
		unless name of @models
			@models[name] = @createListModel _, model[name]
		@models[name]
	
	getObject: (_, name) ->
		unless name of @models
			@models[name] = @createObjectModel _, model[name]
		@models[name]
		
	createObjectModel: util.singlify (_, obj) ->
		koModel = ko.mapping.fromJS obj.get _
		koModel.model = obj
		obj.onChanged (data) ->
			ko.mapping.fromJS data, koModel
		koModel

	createListModel: util.singlify (_, cls) ->
		list = ko.observableArray cls.getAllIDs _
		cls.onChanged list
		list

	createInfoModel: util.singlify (_, model) ->
		koModel = ko.mapping.fromJS model
		koModel.model = model
		model.onChanged ->
			ko.mapping.fromJS model, koModel
		koModel

store = new KOModelStorage

observableList = (observedArray, creator) ->
	elements = {}
	list = ko.observableArray []
	getElement = (_, id) ->
		unless id of elements
			elements[id] = creator _, id
		elements[id]
	observedArray.subscribe update = (arr, _) ->
		for id of elements when not id in arr
			delete elements[id]
		list (getElement(_, id) for id in arr)
	update observedArray(), util.dummyCB
	list
		
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

	@create: (_, viewname, slot) ->
		[row, params] = @_find viewname
		new row.cls _, slot, params if row?

	@_find: (viewname) ->
		for row in _views
			params = row.regex.exec viewname
			return [row, params] if params?
		[null, null]

	@test: (viewname) ->
		@_find(viewname)[0]?

class Slot
	constructor: (_) ->
		@view = ko.observable null
		@viewname = ko.observable()

	setView: (viewname) =>
		if View.test viewname
			@viewname viewname
			util.doAsync (_) =>
				@view View.create _, viewname, this

	clear: ->
		@view null

class SlaveSlot extends Slot
	setView: (->)
	forceView: (args...) -> Slot::setView.apply this, args

class SlotGenerator
	_default = null
	@setDefault: (generator) ->
		_default = generator
	@getDefault: ->
		_default

class WindowSlotGenerator extends SlotGenerator
	show: (viewname) ->
		win.setView viewname

	@setDefault new this

class NewWindowSlotGenerator extends SlotGenerator
	show: (viewname) ->
		window.open "#{window.location.origin}##{viewname}", '', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no'

poll = (func, interval = 1000) ->
	stopped = false
	(clock = =>
		setTimeout (=> clock util.dummyCB unless stopped), interval - (new Date().getTime() % interval)
		do func) util.dummyCB
	pollobj =
		stop: -> stopped = true

truncate = (str, length = 20) ->
	if str.length > length-1
		"#{str[0...length-2]}…"
	else
		str

class WindowSlot extends Slot

	menu = ko.observableArray [ '', 'inbox', 'projects' ]

	constructor: (_) ->
		super
		@msg = ko.observableArray()
		@menu = observableList menu, (_, viewname) -> {
				url: viewname
				label: label _, viewname }
		@showlists = ko.observable false
		@asaplists = observableList store.getList(_, 'AsapList'), (_, id) -> {
				url: "asaplist/#{id}"
				label: store.getInfo(_, id).name }
		inbox = store.getObject _, 'inbox'
		@clock = ko.computed -> "#{icon 'inbox'} #{inbox.size()}"

	setView: (viewname) =>
		if View.test viewname
			super window.location.hash = viewname

	showMessage: (msg, timeout = 5000) ->
		@msg.push obs = ko.observable msg
		if timeout > 0
			setTimeout (=> do @msg.shift), timeout
		obs

	deleteMsg: (msg) =>
		@msg.remove (elem) ->
			elem() is msg
			
	relTime: (time) ->
		new Date(time).toRelativeTime
			nowThreshold: 1000

###		
class DropArea
	constructor: (contentNode, cb) ->
		contentNode.bind 'dragover', (ev) -> do ev.originalEvent.preventDefault
		contentNode.bind 'drop', (ev) ->
			do ev.originalEvent.preventDefault
			cb ev.originalEvent.dataTransfer.getData 'text/plain'

class Emitter
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
		
###
class InboxView extends View
	@registerView /^inbox$/, this, (_) -> icon 'inbox'

	constructor: (_, @slot) ->
		inbox = store.getObject _, 'inbox'
		@template = 'inbox'
		@title = ko.computed -> "Inbox (#{inbox.size()})"
		@icon = 'inbox'
		@innerSlot = new SlaveSlot _
		@full = ko.computed -> inbox.size() > 0
		update = (id, _) =>
			@innerSlot.forceView id2viewname _, id
		inbox.first.subscribe update
		update inbox.first()

class InfoView extends View
	constructor: (_, @slot, match) ->
		@id = match[1]
		@info = store.getInfo _, @id
		@type = @info.model.type
		@template = 'info'
		@icon = 'info-sign'
		@init _
		@states = [{
			state: 'delete'
			label: '&#xf00d;'
			tooltip: 'Delete'
			active: ko.observable false
		},{
			state: 'maybe'
			label: '&#xf059;'
			tooltip: 'Maybe another time'
			active: ko.computed => @info.status() is 'maybe'
		},{
			state: 'default'
			label: '&#xf058;'
			tooltip: 'Normal'
			active: ko.computed => @info.status() is 'default'
		},{
			state: 'inbox'
			label: '&#xf01c;'
			tooltip: 'Put in Inbox'
			active: ko.computed => @info.status() is 'inbox'
		},{
			state: 'urgent'
			label: '&#xf0a2;'
			tooltip: 'This is urgent!'
			active: ko.computed => @info.status() is 'urgent'
		}]
		@references = observableList @info.references, (_, id) ->
			new references[model.cache.getInformation(_, id).type] _, id
	
	addReference: (viewname) =>
		((_) => @info.model.addReference _, viewname2info _, viewname) util.dummyCB

	removeReference: (reference) =>
		@info.model.removeReference util.dummyCB, reference.info.model

	addNote: =>
		util.doAsync (_) =>
			note = new model.Note
			note.create _, '', 'default'
			console.log note.id
			@info.model.addReference _, note

	setStatus: (menuElement) =>
		@info.model.setStatus util.dummyCB, menuElement.state

# 		Delay??
			
class Reference
	constructor: (_, @id) ->
		@info = store.getInfo _, @id
		@hover = ko.observable false
		@type = @info.model.type
		@viewname = info2viewname @info.model
		@init _

references = {}
class NoteView extends InfoView
	@registerView /^note\/(.*)$/, this, (_, match) -> "Note: #{model.cache.getInformation(_, match[1]).content}"

	init: (_) ->
		@title = ko.computed => "Note: #{truncate @info.content()}"
		@icon = 'file-alt'
		@content = ko.observable @info.content()
		timeout = null
		@content.subscribe =>
			clearTimeout timeout if timeout?
			timeout = setTimeout (=> if @dirty() then @saveContent()), 2000
		@info.content.subscribe (content) => @content content
		@dirty = ko.computed => not (@content() is @info.content())
		
	
	saveContent: ->
		util.doAsync (_) =>
			save = win.showMessage "Saving …"
			@info.model.setContent _, @content()
			setTimeout _, 1000
			save 'Save successful!'

class references.note extends Reference
	init: NoteView::init
	saveContent: NoteView::saveContent

###
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
###

class TaskSelector
	constructor: ->
		@delayed = ko.observable true
		@completed = ko.observable false
		@blocked = ko.observable true

	toggle: -> this not this()

class AsapListView extends InfoView
	@registerView /^asaplist\/(.*)$/, this, (_, match) -> "ToDo List: #{model.cache.getInformation(_, match[1]).name}"

	init: (_) ->
		util.doAsync (_) -> model.Asap.getAllIDs _
			# Preload all Asaps, this shouldn't be to big a memory hit but page load is significantly faster.
		@selector = new TaskSelector
		@icon = 'tasks'
		@title = @info.name
		@focus = ko.observable false
		@innerSlot = new SlaveSlot _
			
		unfilteredList = observableList @info.asaps, (_, id) =>
			asap = store.getInfo _, id
			{
				id: asap.id()
				visible: ko.computed =>
					(not asap.completed()? or @selector.completed()) and (asap.active() or asap.delayed())
				description: asap.description}

		@list = ko.computed -> (asap for asap in unfilteredList() when asap.visible())

	setFocus: (data) =>
		util.doAsync (_) =>
			@innerSlot.forceView id2viewname _, data.id
			
###
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
###
class AsapView extends InfoView
	@registerView /^asap\/(.*)$/, this, (_, match) ->	"ToDo: #{model.cache.getInformation(_, match[1]).description}"

	init: (_) ->
		@title = @info.description
		@icon = 'check'
###
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

###
class MainView extends View
	@registerView /^$/, this, (_) -> icon 'pencil'

	constructor: (_, @slot) ->
		@title = 'Secretarius'
		@template = 'main'
		@icon = 'pencil'
#		@slot.setContent require('./template/main')()
#		new NoteCreator $('.newnote', @contentNode)
#		new AsapListsList $('.lists', @contentNode)
#		new AsapListCreator $('.newlist', @contentNode)
	
	delete: ->
win = new WindowSlot _
if View.test document.location.hash[1..]
	win.setView document.location.hash[1..]
else
	win.setView ''

ko.bindingHandlers.drop =
	init: (element, valueAccessor) ->
		$element = $(element)
		$element.bind 'dragover', (ev) -> ev.originalEvent.preventDefault()
		$element.bind 'drop', (ev) ->
			ev.originalEvent.preventDefault()
			valueAccessor() ev.originalEvent.dataTransfer.getData 'text/plain'

ko.bindingHandlers.emitter =
	init: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) ->
		ko.bindingHandlers.drag.init element, valueAccessor, allBindingsAccessor, viewModel, bindingContext
		
	update: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) ->
		ko.bindingHandlers.attr.update element, (-> { href: "##{ko.utils.unwrapObservable valueAccessor()}"}) , allBindingsAccessor, viewModel, bindingContext
		
ko.bindingHandlers.mouse =
	init: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) ->
		ko.bindingHandlers.event.init element, (->
			if (to = allBindingsAccessor().mouseTimeout)?
				timeout = null
				mouseenter: ->
					clearTimeout timeout if timeout?
					valueAccessor() true
				
				mouseleave: ->
					clearTimeout timeout if timeout?
					timeout = setTimeout (-> valueAccessor() false), to
			else
				mouseenter: ->
					valueAccessor() true
			
				mouseleave: ->
					valueAccessor() false),
			allBindingsAccessor, viewModel, bindingContext

ko.bindingHandlers.drag =
	init: (element, valueAccessor) ->
		$element = $(element)
		$element.attr 'draggable', 'true'
		$element.bind 'dragstart', (ev) =>
			ev.originalEvent.dataTransfer.setData 'text/plain', ko.utils.unwrapObservable valueAccessor()
			ev.originalEvent.dataTransfer.setData 'text/uri-list', "#{window.location.origin}/##{ko.utils.unwrapObservable valueAccessor()}"

ko.virtualElements.allowedBindings.fadeVisible = true

ko.bindingHandlers.fadeVisible =
	init: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) ->
		child = ko.virtualElements.firstChild element
		while child?
			if child.nodeType is 1
				$(child).toggle ko.utils.unwrapObservable valueAccessor()
			child = ko.virtualElements.nextSibling child

	update: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) ->
		unless (show = ko.utils.unwrapObservable valueAccessor())
			child = ko.virtualElements.firstChild element
			while child?
				if child.nodeType is 1
					$(child).fadeOut 500
				child = ko.virtualElements.nextSibling child
		if show
			child = ko.virtualElements.firstChild element
			while child?
				if child.nodeType is 1
					$(child).fadeOut 0
					$(child).fadeIn 500
				child = ko.virtualElements.nextSibling child

ko.bindingHandlers.autosize =
	init: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) ->
		$(element).autosize()
		setTimeout (-> $(element).trigger 'autosize') , 0
		allBindingsAccessor().valueUpdate = 'afterkeydown'
		ko.bindingHandlers.value.init element, valueAccessor, allBindingsAccessor, viewModel, bindingContext
	update: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) ->
		setTimeout (-> $(element).trigger 'autosize') , 0
		ko.bindingHandlers.value.update element, valueAccessor, allBindingsAccessor, viewModel, bindingContext

ko.bindingHandlers.slidingList =
	makeValueAccessor: (valueAccessor) ->
		->
			data: valueAccessor()
			beforeRemove: (elem) ->
				if elem.nodeType is 1 then $(elem).slideUp 500, -> $(elem).remove()
			afterAdd: (elem) ->
				if elem.nodeType is 1 then $(elem).hide().slideDown 500

	init: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) ->
		ko.bindingHandlers.foreach.init element, ko.bindingHandlers.slidingList.makeValueAccessor(valueAccessor)

	update: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) ->
		ko.bindingHandlers.foreach.update element, ko.bindingHandlers.slidingList.makeValueAccessor(valueAccessor), allBindingsAccessor, viewModel, bindingContext
		
$(document).on 'click', 'a[href=""]', -> false
$(document).on 'click', 'a[href^="#"]', ->
	SlotGenerator.getDefault().show $(this).attr('href')[1..]
	false

setInterval (-> $('time').html -> win.relTime $(this).attr 'datetime'), 1000

$ ->
	ko.applyBindings win, document.documentElement

win.showMessage 'Welcome to Secretarius!', 10000
