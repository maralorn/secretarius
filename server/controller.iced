exports.serve = (app, model) ->
	app.get "/:type/:id", (req, res) ->
		fields = req.param("fields")
#		if "type" in fields
#			res.send
#				type: req.param("type")
#		else
		res.send
			id: req.param("id")
			content: "Diese Notiz kommt vom Server"
			type: req.param("type")
