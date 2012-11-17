{View, Draggable} = require "view"

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
		$("form.createnote", @viewslot.getContentNode()).submit (event) ->
			note = new (model.Note)
			note.create $("input[type='text']", @).val()
			false
