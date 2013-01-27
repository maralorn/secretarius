model = require 'jsonmodel'
iced = require 'myiced'
iced.util.pollute window
ui = require 'ui'

exports.WindowSlot = class WindowSlot extends ui.Slot
	constructor: (viewname) ->
		model.inbox.get -> return
		menu = ['inbox', '']
		labels = {}
		await for dish in menu
			ui.label defer(error, labels[dish]), dish
		$('body').html require('template/body') {menu: (labels[dish] for dish in menu)}
		for dish in menu
			emitter = new ui.Emitter $("#menu > button:contains('#{labels[dish]}')")
			emitter.setViewName dish
		$clock = $('#clock')
		do $clock.hide
		clock = ->
			do runclock
			$('span.reltime').each ->
				node = $(this)
				node.html new Date(1000 * node.attr 'x-time').toRelativeTime
					nowThreshold: 3000
			try
				do $clock.show
				$clock.html "#{do (new Date).toLocaleString} Inbox:#{model.inbox.values.size}"
			catch err
				do $clock.hide
				console.log 'No clock update.'
		do runclock = -> setTimeout clock, 1000 - do new Date().getTime % 1000
		super $('#content'), do $('#header > h1').first
		WindowSlot.__super__.setView.call this, viewname
		new ui.DropArea do $('#header > h1').first, @setView
		
	setView: (viewname) =>
		window.location.href = "http://#{window.location.host}/#{viewname}"
	
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
