exports.serve = (app, model) ->
	app.get "/:type/:id", (req, res) ->
		switch req.param "type"
			when "inbox"
				inbox = new (model.Inbox)
				switch req.param "id"
					when "first"
						await inbox.getFirst defer error, firstinfo
						if firstinfo?
							await firstinfo.get defer error, answer
						else
							answer =
								msg: "inbox is empty"
					when "size"
						await inbox.size defer error, size
						answer =
							size: size
					else
						answer = {}
			else
				info = new (model.Information) req.param "id"
				type = req.param "type"
				info.type = type unless type == "information"
				switch req.param "filter"
					when "type"
						await info.getType defer error, type
						answer =
							type: type
					else
						await info.get defer error, answer
		if error?
			console.log error
			res.send 500, error
		else
			res.send answer
	
	app.post "/:type", (req, res) ->
		type = req.param "type"
		answer =
			msg: "Type not found."
		switch type
			when "note"
				await new (model.Note)().create req.body.content, defer error, id
				answer =
					id: id
		res.send answer

	app.patch "/:type/:id", (req, res) ->
		type = req.param "type"
		id = req.param "id"
		method = req.body.method
		switch method
			when "setStatus"
				new (model.Information)(id).setStatus req.body.status
		res.send 200, {id: id}
