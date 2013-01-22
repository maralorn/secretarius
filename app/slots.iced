model = require 'jsonmodel'
iced = require 'myiced'
iced.util.pollute window
ui = require 'ui'

exports.WindowSlot = class WindowSlot extends ui.Slot
	constructor: ->
		model.inbox.get -> return
		menu = ['Inbox', 'CreateNote', 'Test', 'LongDish', 'VeryLongDish']
		$('body').html require('template/body') {menu: menu}
		for dish in menu
			emitter = new ui.Emitter $("#menu > button:contains('#{dish}')")
			emitter.setViewName do dish.toLowerCase
		$clock = $('#clock')
		do $clock.hide
		clock = ->
			do runclock
			try
				do $clock.show
				$clock.html "#{do (new Date).toLocaleString} Inbox:#{model.inbox.values.size}"
			catch err
				do $clock.hide
				console.log 'No clock update.'
		do runclock = -> setTimeout clock, 1000 - do new Date().getTime % 1000
		super $('#content'), do $('#header > h1').first
	
	setTitle: (title) ->
		super
		document.title = "#{title} - Secretarius"

	close: ->
		 window.open '', '_self', ''
		 do window.close
### 
exports.ContainerViewSlot = class ContainerViewSlot extends Slot
	constructor: (@container) ->
		@id = @container.attr "id"
		@container.data "slot", @
		@draw()

	draw: ->
		@container.html require("template/container").render()
		@title = $ "##{@id} > h1"
		@content = $ "##{@id} > div"
		@title.droppable
			drop: (event, ui) => ui.draggable.data("dragobject").createView(@)

	fixTitleLayout: =>
		height = @title.height() + 13
		@content.css("padding-top", height)
		@content.css("height", @content.parent().innerHeight() - height - 6)
		

exports.TabViewSlot = class TabViewSlot extends Slot
	constructor: ->
		@id = "Tab#{Math.floor Math.random() * 1000000000000000}"
		$("#tabs > ul").append require("template/tabtitle").render
			id: @id
		$("#tabs").append require("template/tab").render
			id: @id
		$("#tabs").tabs("refresh")
		@title = $ "#tabs > ul > li > a[href='##{@id}']"
		@content = $ "##{@id}"
		$("#tabs > ul > li > a[href='#close#{@id}']").click =>
			@destroy()
			false
		@content.data "slot", @

	destroy: ->
		@title.parent().remove()
		@content.remove()

	clear: ->
		@title.html "Empty"
		@content.html ""

	getHeader: ->
		@title.parent()
###
