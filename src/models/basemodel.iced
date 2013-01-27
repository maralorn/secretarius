model = exports

iced = require '../myiced'
iced.util.pollute if window? then window else global

model.getClassByType = (type) ->
		for name, class_ of this
			return class_ if name.toLowerCase() == type

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

	storeInfo: (values) ->
		@infos[values.id]?._store values

	getInformation: singlify func (autocb, id) ->
		unless @infos[id]?
			await new model.Information(id).get defer(values)
			info = new (model.getClassByType values.type) values.id
			info._store values
			@registerInfo info
		@infos[id]

model.cache = new InfoCache
