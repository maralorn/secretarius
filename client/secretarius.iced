require 'lib/jquery'
require 'lib/jade'

$ ->
	$('body').append require('template/body').render()
