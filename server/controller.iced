exports.serve = (app, model) ->

	classByType = (type) ->
		for name, class_ of model
			return class_ if name.toLowerCase() == type

	findGetter = (filter, object) ->
		string = "get#{if filter? then filter else ''}".toLowerCase()
		for name, getter of object
			return getter if name.toLowerCase() == string

	parse = (req, res) ->
		httpmethod = req.method
		type = req.param "type"
		id = req.param "id"
		return unless type?
		console.log "#{httpmethod} /#{type}/#{id}"
		object = new (classByType type)? id
		switch httpmethod.toLowerCase()
			when "get"
				filter = req.param "filter"
				method = findGetter filter, object
			when "post"
				method = object.create
			when "patch"
				method = object[req.body.method]
		args = []
		prep = (x, cb) -> cb null, if x? then x else {msg: "success"}
		prepOnPost = (id, cb) -> cb null, {id: id}
		switch method
			when model.Information.prototype.getType
				prep = (type, cb) -> cb null, {type: type}
			when model.Information.prototype.setStatus
				args.push req.body.status
			when model.Information.prototype.addReference
				args.push new (model.Information) req.body.reference
			when model.Information.prototype.setDelay
				args.push new Date(req.body.delay)
			when model.Note.prototype.create
				args.push req.body.content
				prep = prepOnPost
			when model.Inbox.prototype.getFirst
				prep = (info, cb) ->
					if info?
						await info.get cb
					else
						cb null, {msg: "inbox is empty"}
			when model.Inbox.prototype.getSize
				prep = (size, cb) -> cb null, {size: size}
			else
				unless method in [model.Information.prototype.get]
					error = {msg: "method not found"}
		unless error?
			await
				args.push defer error, result
				method.apply object, args
		unless error?
			await prep result, defer error, answer
		unless error?
			res.send 200, answer
		else
			res.send 500, {msg: "Internal Error"}
			console.log error
		

	app.all "/:type/:id", parse
	app.all "/:type", parse
