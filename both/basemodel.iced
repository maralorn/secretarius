exports.ModelObject = class ModelObject
	on: (event, cb) ->
		@_cbs = {} unless @_cbs?
		@_cbs[event] = [] unless @_cbs[event]?
		@_cbs[event].push cb
	
	emit: (event) ->
		for cb in @_cbs[event]
			try
				cb()
			catch err
				@removeCb event, cb
		
	removeCb: (event, cb) ->
		@_cbs[event] = (elem for elem in @_cbs[event] when elem isnt cb)
		delete @_cbs[event] if @_cbs[event] == []

	onChanged: (cb) ->
		@on("changed", cb)
			
	onDeleted: (cb) ->
		@on("deleted", cb)

	change: ->
		@emit "changed"

	delete: ->
		@emit "deleted"
