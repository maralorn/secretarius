exports.message = (msg) ->
	msgcontainer = $('#msgcontainer')
	(msgnode = $(require('./template/msg') msg: msg)).appendTo msgcontainer
	(lb = $('<br>')).appendTo msgcontainer
	do msgnode.hide
	msgnode.show 1000
	setTimeout (->	msgnode.hide 1000, -> do msgnode.remove; do lb.remove), 5000
	return msgnode

exports.View = class View
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

exports.DropArea = class DropArea
	constructor: (contentNode, cb) ->
		contentNode.bind 'dragover', (ev) -> do ev.originalEvent.preventDefault
		contentNode.bind 'drop', (ev) ->
			do ev.originalEvent.preventDefault
			cb ev.originalEvent.dataTransfer.getData 'text/plain'

exports.Slot = class Slot
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
			ev.originalEvent.dataTransfer.setData 'text/uri-list', "http://#{window.location.host}/#{do @getViewName}"
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

exports.WindowSlotGenerator = class WindowSlotGenerator extends SlotGenerator
	show: (viewname) ->
		window.open "#{document.URL.match(/https?:\/\/.*\//)[0]}#{viewname}", '', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,copyhistory=no'
	@setDefault new this

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
		@node.html require('./template/upload') @options
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
		@node.html require('./template/timepicker') @options
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

exports.ListManager = class ListManager
	constructor: (@node, @creator) ->
		@elements = {}
		
	setList: (_, list) =>
		for id in list when id not of @elements
			element = @creator _, id
			unless id of @elements
				@elements[id] = element
				if (id is @select)
					element.prop 'selected', true
				element.appendTo @node
		for id, element of @elements when id not in list
			delete @elements[id]
			do element.remove

exports.InfoListManager = class InfoListManager extends ListManager
	constructor: (node, creator) ->
		super node, (_, id) ->
			info = model.cache.getInformation _, id
			if info?
				creator _, info

exports.createInfoButton = createInfoButton = (info, type = false, del) ->
	domnode = $(require('./template/infobutton') del: del?)
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
	constructor: (node, type=false, del) ->
		super node, (autocb, reference) ->
			createInfoButton reference, type, del

exports.ReferenceList = class ReferenceList extends InfoList
	constructor: (node, info) ->
		new DropArea node, (viewname, _) ->
			if (id = /^\w*:(.*)$/.exec(viewname)?[1])?
				reference = model.cache.getInformation _, id
				if reference?
					info.addReference _, reference
		super node, true, (reference) -> info.removeReference (->), reference

exports.InfoClassListManager = class InfoClassListManager extends InfoListManager
	constructor: (_, node, cls, creator) ->
		super node, creator
		cls.onChanged @setList
		@setList cls.getAllIDs _
		
exports.AsapListsList = class AsapListsList extends InfoClassListManager
	constructor: (node) ->
		super node, model.AsapList, (autocb, list) ->
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
		node.html require('./template/asaplistcreator')()
		list = $('input[name=list]', node)
		$('form[name=list]').submit (ev) ->
			do ev.preventDefault
			new model.AsapList().create ((error) -> list.val '' unless error?), list.val()
	

exports.NoteCreator = class NoteCreator
	constructor: (node) ->
		node.html require('./template/notecreator')()
		content = $('input[name=note]', node)
		$('form[name=note]', node).submit (ev) ->
			do ev.preventDefault
			new model.Note().create ((error) -> content.val '' unless error?), content.val()

exports.AsapCreator = class AsapCreator
	constructor: (node, @list=null, @project=null, @reference=null) ->
		node.append form = $(require('./template/asapcreator')
			list: !(@list?)
			project: !(@project?))
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
		node.append form = $(require('./template/projectcreator')
			parent: !(@parent?))
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
		
exports.defaultTo = defaultTo = (obj, defaults) ->
	for key, value of defaults
		obj[key] = value unless obj[key]?

exports.id2viewname = (_, id) ->
	exports.info2viewname model.cache.getInformation _, id
	
exports.viewname2info = (_, viewname) ->
	if (id = /^\w*:(.*)$/.exec(viewname)?[1])?
		model.cache.getInformation _, id
	else
		throw new Error "No Infoview Name: #{viewname}"

exports.info2label = (_, info) ->
	exports.label _, exports.info2viewname info
	
exports.info2viewname = (info) ->
	"#{info.type}:#{info.id}"

exports.id2label = (_, id) ->
	exports.id2viewname _, id
	exports.label _, viewname

exports.label = (_, viewname) ->
	View.getLabel _, viewname
	
exports.inbox = require './inbox'
exports.slots = require './slots'
exports.info = require './info'
exports.main = require './main'
