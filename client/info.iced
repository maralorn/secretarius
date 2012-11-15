{View, Draggable} = require("view")

getViewByType = (type) ->
	viewByType[type]

class InfoDraggable extends Draggable
	constructor: (@DOMnode, @info) ->
		super(@DOMnode)
	
	createView: (viewslot) ->
		InfoView.create viewslot, @info

exports.InfoView = class InfoView extends View
	@create: (viewslot, info) ->
		await info.getType defer(type)
		new (getViewByType type) viewslot, info
		
	constructor: (@viewslot, @info) ->
		new InfoDraggable @viewslot.getHeader(), @info

class NoteView extends InfoView
	constructor: (@viewslot, @info) ->
		super @viewslot, @info
		await @info.get defer content
		@viewslot.setTitle "Note"
		@viewslot.setContent content.content

viewByType =
	note: NoteView
