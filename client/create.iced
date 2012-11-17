{View, Draggable} = require "view"
{InfoView} = require "info"

exports.CreateNoteDraggable = class CreateNoteDraggable extends Draggable
	createView: (viewslot) ->
		new CreateNoteView viewslot

class CreateView extends View
	constructor: (@viewslot) ->

class CreateNoteView extends CreateView
	constructor: (@viewslot) ->
		new CreateNoteDraggable @viewslot.getHeader()
		@viewslot.setTitle "New Note"
		@viewslot.setContent require("template/createnote").render()
		slot = @viewslot
		$("form.createnote", @viewslot.getContentNode()).submit (event) ->
			content = $("input[type='text']", @).val()
			if content != ""
				note = new (model.Note)
				note.create content, ->
					InfoView.create slot, note
			false
