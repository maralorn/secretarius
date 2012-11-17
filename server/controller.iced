exports.serve = (app, model) ->
	classByType =
		note: model.Note
		


	# TODO: one app.use get type, id, req.method optionally req.param.method to create an object and a method then call by method
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
		
		info = new (classByType[type])(id)
		f = info[method]
		switch f
			when model.Information.prototype.setStatus
				await f.call info, req.body.status, defer error
			when model.Information.prototype.addReference
				await f.call info, new (model.Information)(req.body.reference), defer error
			when model.Information.prototype.setDelay
				await f.call info, new Date(req.body.delay), defer error
		unless error?
			res.send 200, {id: id}
		else
			res.send 500, {msg: "internale error"}
			console.log error
