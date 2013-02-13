model = exports

iced = require '../myiced'
iced.util.pollute if window? then window else global

model.UUID_REG = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/

model.getClassByType = (type) ->
		for name, class_ of this
			return class_ if name.toLowerCase() is type

model.extend = (obj) ->
	model[key] = value for key, value of obj
	return model

model.ModelObject = class ModelObject
	on: (event, cb) ->
		@_cbs = {} unless @_cbs?
		@_cbs[event] = [] unless @_cbs[event]?
		@_cbs[event].push cb unless cb in @_cbs[event]
	
	emit: (event, data) ->
		if @_cbs?[event]?
			for cb in @_cbs[event]
#				try
					cb data
#				catch err
#					@removeCb event, cb
		
	removeCb: (event, cb) ->
		@_cbs[event] = (elem for elem in @_cbs[event] when elem isnt cb)
		delete @_cbs[event] if @_cbs[event] == []
		debug event, "callback removed", @constructor.name

	onChanged: (cb) ->
		@on("changed", cb)
			
	onDeleted: (cb) ->
		@on("deleted", cb)

	change: (data) ->
		@emit "changed", data

	delete: ->
		@emit "deleted"

	cbs = {}
	@on: (event, cb) ->
		cbs[@name] = {} unless cbs[@name]?
		obj = cbs[@name]
		obj[event] = [] unless obj[event]?
		obj[event].push cb unless cb in obj[event]
	
	@emit: (event, data) ->
		if cbs[@name]?[event]?
			for cb in cbs[@name][event]
#				try
					cb data
#				catch err
#					@removeCb event, cb
		
	@removeCb: (event, cb) ->
		cbs[@name][event] = (elem for elem in cbs[@name][event] when elem isnt cb)
		delete cbs[@name][event] if cbs[@name][event] == []
		debug event, "callback removed", @name

	@onChanged: (cb) ->
		@on("changed", cb)
			
	@onDeleted: (cb) ->
		@on("deleted", cb)

	@change: (data) ->
		@emit "changed", data

class InfoCache
	constructor: ->
		@infos = {}

	registerInfo: (info) ->
		@infos[info.id] = info

	delete: (id) ->
		if @infos[id]?
			do @infos[id].delete
			@unregisterInfo @infos[id]

	unregisterInfo: (info) ->
		if info.id? and @infos[info.id]?
			delete @infos[info.id]

	updateInfo: (values) ->
		@storeInfo values, true

	storeInfo: (values, mustExist = false) ->
		unless (info = @infos[values.id])? or mustExist
			info = new (model.getClassByType values.type) values.id
			@registerInfo info
		info?._store values

	getInformation: singlify func (autocb, id) ->
		if id? and model.UUID_REG.test id
			unless @infos[id]?
				await new model.Information(id).get defer(values)
				@storeInfo values
			@infos[id]
		else
			null

model.cache = new InfoCache
