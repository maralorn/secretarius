require './vendor/jquery'
require './vendor/jquery.autosize'
moment = require 'moment'
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

	clear: =>
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
			
	relTime: (time) -> moment(time).calendar()

class InboxView extends View
	@registerView /^inbox$/, this, (_) -> icon 'inbox'

	constructor: (_, @slot) ->
		inbox = store.getObject _, 'inbox'
		@template = 'inbox'
		@title = ko.computed -> "Inbox (#{inbox.size()})"
		@icon = 'inbox'
		@innerSlot = new SlaveSlot _
		@full = ko.computed(-> inbox.size() > 0).extend throttle:500
		update = (id, _) =>
			@innerSlot.forceView id2viewname _, id
		inbox.first.subscribe update
		update inbox.first()

class TimePicker
	constructor: (@name, @value, @change) ->
		@options = []
		@addOption 1, 'd', '[Tomorrow]'
		for i in [2..6]
			@addOption i, 'd', 'dddd'
		@addOption 7, 'd', '[In 1 Week]'
		@addOption 14, 'd', '[In 2 Weeks]'
		@addOption 21, 'd', '[In 3 Weeks]'
		for i in [1..3]
			@addOption i, 'M', 'MMMM', 'month'
		@addOption 6, 'M', 'MMMM', 'month'
		@addOption 9, 'M', 'MMMM', 'month'
		@addOption 365, 'd', '[In 1 Year]'
		@addOption 1, 'y', 'YYYY', 'year'
		@addOption 2, 'y', 'YYYY', 'year'
		@selectedDate = ko.observable @options[0]

	remove: => @change null

	set: => @change @selectedDate().date.toDate()
		
	addOption: (distance, unit, label, crop='day') ->
		@options.push option =
			date: moment().add(distance, unit).startOf(crop)
		option.label = option.date.format label

class InfoView extends View
	constructor: (_, @slot, match) ->
		@id = match[1]
		@info = store.getInfo _, @id
		@type = @info.model.type
		@template = 'info'
		@icon = 'info-sign'
		@dirty = false
		@init _
		@states = [{
			state: 'delete'
			label: '&#xf00d;'
			tooltip: 'Delete'
			active: ko.computed => @info.status() is 'delete'
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
		@delayPicker = new TimePicker 'delay', @info.delay, @setDelay
	
	addReference: (viewname) =>
		((_) => @info.model.addReference _, viewname2info _, viewname) util.dummyCB

	removeReference: (reference) =>
		@info.model.removeReference util.dummyCB, reference.info.model

	addNote: =>
		util.doAsync (_) =>
			note = new model.Note
			note.create _, '', 'default'
			@info.model.addReference _, note

	setStatus: (menuElement) =>
		@info.model.setStatus util.dummyCB, menuElement.state
	
	setDelay: (date) =>
		@info.model.setDelay util.dummyCB, date
	
	save: (->)

# 		Delay??
			
class Reference
	constructor: (_, @id) ->
		@info = store.getInfo _, @id
		@hover = ko.observable false
		@type = @info.model.type
		@viewname = info2viewname @info.model
		@dirty = false
		@init _
	
	save: (->)

references = {}
class NoteView extends InfoView
	@registerView /^note\/(.*)$/, this, (_, match) -> "Note: #{model.cache.getInformation(_, match[1]).content}"

	init: (_) ->
		@title = ko.computed => "Note: #{truncate @info.content()}"
		@icon = 'pushpin'
		@content = ko.observable @info.content()
		timeout = null
		@dirty = ko.computed => not (@content() is @info.content())
		@content.subscribe =>
			clearTimeout timeout if timeout?
			timeout = setTimeout (=> if @dirty() then @save()), 5000
		@info.content.subscribe (content) => @content content
	
	save: ->
		util.doAsync (_) =>
			save = win.showMessage "Saving …"
			@info.model.setContent _, @content()
			setTimeout _, 1000
			save 'Save successful!'

class references.note extends Reference
	init: NoteView::init
	save: NoteView::save

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
			
		unfilteredList = observableList @info.asaps, (_, id) => new AsapListViewElement _, id

		@list = ko.computed(=> (asap for asap in unfilteredList() when ((not asap.done() or @selector.completed()) and (asap.active() or @selector.delayed())))).extend throttle: 1

	setFocus: (data) =>
		util.doAsync (_) =>
			@innerSlot.forceView id2viewname _, ko.utils.unwrapObservable(data.id)

class AsapListViewElement
	constructor: (_, @id) ->
		@asap = store.getInfo _, @id
		@done = ko.computed (=> @asap.completed()?)
		@active = @asap.active
		@description = @asap.description
		@project = ko.computed (=>
			prj = ko.observable null
			if @asap.parent()?
				util.doAsync (_) => prj store.getInfo(_, @asap.parent())
			prj)
	
	toggleDone: =>
		if @done()
			@asap.model.undo util.dummyCB
		else
			@asap.model.done util.dummyCB

class ProjectView extends InfoView
	@registerView /^project\/(.*)$/, this, (_, match) ->	"Project: #{model.cache.getInformation(_, match[1]).description}"

	init: (_) ->
		@title = @info.description
		@icon = 'sitemap'

class AsapView extends InfoView
	@registerView /^asap\/(.*)$/, this, (_, match) ->	"ToDo: #{model.cache.getInformation(_, match[1]).description}"

	init: (_) ->
		@title = @info.description
		@icon = 'edit'
		@deadlinePicker = new TimePicker 'deadline', @info.deadline, @setDeadline
		@done = ko.computed (=> @info.completed()?)
		@description = ko.observable @info.description()
		timeout = null
		@dirty = ko.computed => not (@description() is @info.description())
		@description.subscribe =>
			clearTimeout timeout if timeout?
			timeout = setTimeout (=> if @dirty() then @save()), 5000
		@info.description.subscribe (description) => @description description
		@project = ko.computed (=>
			prj = ko.observable null
			if @info.parent()?
				util.doAsync (_) => prj store.getInfo(_, @info.parent())
			prj)
	
	save: ->
		util.doAsync (_) =>
			save = win.showMessage "Saving …"
			@info.model.setDescription _, @description()
			setTimeout _, 1000
			save 'Save successful!'

	setDeadline: (date) =>
		@info.model.setDeadline util.dummyCB, date
	
	toggleDone: =>
		if @done()
			@info.model.undo util.dummyCB
		else
			@info.model.done util.dummyCB
	
	
class ProjectsView extends View
	@registerView /^projects$/, this, (_) -> icon 'sitemap'
	
	constructor: (_, @slot) ->
		@template = 'projects'
		@title = 'Projects'
		@icon = 'sitemap'

class MainView extends View
	@registerView /^$/, this, (_) -> icon 'pencil'

	constructor: (_, @slot) ->
		@title = 'Secretarius'
		@template = 'main'
		@icon = 'pencil'
	
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
		obs = valueAccessor()
		if (to = allBindingsAccessor().mouseTimeout)?
			timeout = null
			handler =
				mouseenter: ->
					clearTimeout timeout if timeout?
					obs true
				mouseleave: ->
					clearTimeout timeout if timeout?
					timeout = setTimeout (-> obs false), to
		else
			handler =
				mouseenter: -> obs true
				mouseleave: -> obs false
		ko.bindingHandlers.event.init element, (-> handler), allBindingsAccessor, viewModel, bindingContext

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
					$(child).stop(true, true).fadeOut 500
				child = ko.virtualElements.nextSibling child
		if show
			child = ko.virtualElements.firstChild element
			while child?
				if child.nodeType is 1
					$(child).stop(true, true).fadeIn 500
				child = ko.virtualElements.nextSibling child

ko.bindingHandlers.autosize =
	init: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) ->
		$(element).autosize()
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

$ -> ko.applyBindings win, document.documentElement
