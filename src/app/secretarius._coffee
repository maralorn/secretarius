ui = require './ui'
sec = require 'libsecretarius'
util = sec.util
window.model = sec()

request = document.URL.match(/https?:\/\/.*\/(.*)/)?[1]
$ -> new ui.slots.WindowSlot util.dummy, request
