model = require 'jsonmodel'

iced = require 'myiced'
iced.util.pollute window

ui = require 'ui'

class InboxView extends ui.View
	@registerView /^inbox$/, this, func (autocb) -> 'Inbox'

	constructor: (@slot) ->
		@size = @first = null
		@context = @slot.getContentNode()
		@slot.setContent do require "template/inbox"
		@innerslot = new ui.Slot do $('.inboxinfo', do @slot.getContentNode).first, do $('h1', do @slot.getContentNode).first
		model.inbox.onChanged @draw
		model.inbox.get (err, values) => unless err? then @draw values
		innerFlip = new ui.Flippable $('form[name=newtodo]', @context), $('form[name=newproject]', @context), 0
		outerFlip = new ui.Flippable($('.newtasks > button', @context), $('.newtasks > form', @context), 0)
		outerFlip.addToggler $('.newtasks > button', @context)
		$('button[name=asap]', @context).click innerFlip.showFront
		$('button[name=project]', @context).click innerFlip.showBack
		outerFlip.addToggler $('.newtasks > form > button[type=button]', @context)
		await
			model.AsapList.getAll defer(error, lists)
			model.Project.getActive defer(error, projects)
		for list in lists
			$('select[name=list]', @context).append new Option list.name, list.id
		projectlists = $('select[name=project],[name=parent]', @context)
		projectlists.append new Option '', ''
		for project in projects
			projectlists.append new Option project.description, project.id
		asapname = $('input[name=asap]', @context)
		$('form[name=newtodo]', @context).submit (ev) =>
			do ev.preventDefault
			await
				model.cache.getInformation defer(error, list), $('select[name=list]', @context).val()
				model.cache.getInformation defer(error, project), $('select[name=project]', @context).val()
			new model.Asap().create ((err) =>	asapname.val '' unless err?), asapname.val(), list, @first, project
		projectname = $('input[name=project]', @context)
		$('form[name=newproject]', @context).submit (ev) =>
			do ev.preventDefault
			await
				model.cache.getInformation defer(error, parent), $('select[name=parent]', @context).val()
			new model.Project().create ((err) => projectname.val '' unless err?), projectname.val(), @first, parent

	delete: ->
		model.inbox.removeCb 'changed', @draw

	draw: (values) =>
		unless @size is values.size
			@slot.setTitle "Inbox (#{@size = values.size})"
		unless @first is values.first
			@first = values.first
			if @first?
				@innerslot.setView "#{@first.type}:#{@first.id}"
			else
				do @innerslot.clear
