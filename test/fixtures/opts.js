'use strict';

function getOpts() {
	var opts = {
		'hostname': 'api.travis-ci.org',
		'port': 443,
		'protocol': 'https'
	};
	return opts;
}


// EXPORTS //

module.exports = getOpts;
