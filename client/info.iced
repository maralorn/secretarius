{View, Draggable} = require("view")

getViewByType = (type) ->
	view = viewByType[type]
	unless view? then console.log "Type not found: #{type}"
	return view

class InfoDraggable extends Draggable
	constructor: (@DOMnode, @info) ->
		super(@DOMnode)
	
	createView: (viewslot) ->
		InfoView.create viewslot, @info

exports.InfoView = class InfoView extends View
	@create: (viewslot, info) ->
		await info.getType defer error, type
		new (getViewByType type) viewslot, info
		
	constructor: (@viewslot, @info) ->
		new InfoDraggable @viewslot.getHeader(), @info

class NoteView extends InfoView
	constructor: (@viewslot, @info) ->
		super @viewslot, @info
		await @info.get defer()
		@viewslot.setTitle "Note"
		@viewslot.setContent @info.content

viewByType =
	note: NoteView
