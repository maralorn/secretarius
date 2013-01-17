
ports = []

self.addEventListener 'connect',((e) ->
	ports.push (port = e.ports[0])
	do port.start
	port.postMessage
		data: ['test']
		msg: 'Hello!'), false

broadcast = (name) ->
	(event) ->
		msg =
			data: JSON.parse event.data
			name: name
		for port in ports
			port.postMessage msg

new EventSource("/information/update").addEventListener 'message', broadcast('info'), false
new EventSource("/inbox/update").addEventListener 'message', broadcast('inbox'), false
