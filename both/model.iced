model = exports

model.getClassByType = (type) ->
		for name, class_ of @
			return class_ if name.toLowerCase() == type

model.extend = (obj) ->
	model[key] = value for key, value of obj
	return model

model.ModelObject = class ModelObject
	on: (event, cb) ->
		@_cbs = {} unless @_cbs?
		@_cbs[event] = [] unless @_cbs[event]?
		@_cbs[event].push cb
	
	emit: (event, data) ->
		if @_cbs?[event]?
			for cb in @_cbs[event]
				try
					cb data
				catch err
					@removeCb event, cb
		
	removeCb: (event, cb) ->
		@_cbs[event] = (elem for elem in @_cbs[event] when elem isnt cb)
		delete @_cbs[event] if @_cbs[event] == []

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

	unregisterInfo: (info) ->
		if info.id? and @infos[info.id]?
			delete @infos[info.id]

	storeInfo: (values) ->
		infos[values.id]?._store values

	getInformation: (cb, id) ->
		if @infos[id]?
			if @infos[id].__lock?
				@infos[id].__lock.push cb
			else
				cb null, @infos[id]
		else
			@infos[id] = {__lock: [cb]}
			await new (model.Information(id)).get defer error, values
			info = new (model.getClassByType values.type)(values.id)
			info._store values
			cb(null, info) for cb in infos[id].__lock
			@registerInfo info

model.cache = new InfoCache
