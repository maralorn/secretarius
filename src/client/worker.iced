
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

sse = new EventSource("/sseupdate")
sse.addEventListener 'infochange', broadcast('info'), false
sse.addEventListener 'inboxchange', broadcast('inbox'), false
sse.addEventListener 'infodeleted', broadcast('deleted'), false
