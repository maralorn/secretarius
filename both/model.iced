exports.extend = (model) ->
	model.getClassByType = (type) ->
		for name, class_ of model
			return class_ if name.toLowerCase() == type
	return model
