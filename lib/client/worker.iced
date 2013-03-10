
ports = []

self.addEventListener 'connect',((e) ->
	ports.push port = e.ports[0]
	do port.start)

broadcast = (name) ->
	(event) ->
		msg =
			data: JSON.parse event.data
			name: name
		for port in ports
			port.postMessage msg

sse = new EventSource("/sseupdate")
sse.addEventListener 'changed', broadcast('changed'), false
sse.addEventListener 'inbox', broadcast('inbox'), false
sse.addEventListener 'deleted', broadcast('deleted'), false
sse.addEventListener 'new', broadcast('new'), false
