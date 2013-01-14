{View, Draggable} = require "view"
{InfoView} = require "info"
model = require "jsonmodel"

exports.CreateNoteDraggable = class CreateNoteDraggable extends Draggable
	createView: (viewslot) ->
		note = new (model.Note)
		await note.create defer(error, id), ""
		InfoView.create viewslot, note
