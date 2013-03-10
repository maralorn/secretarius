#!/usr/bin/node
require('streamline').register({
	fibers: false,
	cache: true,
	verbose: true,
});
require('./buildScript')
