exports.Draggable = class Draggable
	constructor: (@DOMnode) ->
		@DOMnode.draggable
			revert: true
			cancel: ""
			zIndex: 10
			helper: "clone"
			distance: 20
			opacity: 1
		@DOMnode.data("dragobject", @)

	createView: (viewslot) ->
		new View(viewslot)

	getInformation: ->

exports.View = class View

	constructor: (@viewslot) ->
		@viewslot.setTitle("This View forgot to set a Title!")
		@viewslot.setContent("This View forgot to set a Content!")
		new Draggable(@viewslot.getHeader())
