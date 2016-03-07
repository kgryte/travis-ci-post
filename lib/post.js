'use strict';

// MODULES //

var factory = require( './factory.js' );


// POST //

/**
* FUNCTION: post( [data,] opts, clbk )
*	Sends a POST request to a Travis CI API endpoint.
*
* @param {String|Object} [data] - request data
* @param {Object} opts - function options
* @param {String} [opts.protocol='https'] - request protocol
* @param {String} [opts.hostname='api.travis-ci.org'] - endpoint hostname
* @param {Number} [opts.port] - endpoint port
* @param {String} [opts.pathname='/'] - resource pathname
* @param {String} [opts.token] - Travis CI access token
* @param {String} [opts.accept='application/vnd.travis-ci.2+json'] - media type
* @param {String} [opts.useragent] - user agent string
* @param {Function} clbk - callback to invoke upon query completion
* @returns {Void}
*/
function post( data, opts, clbk ) {
	if ( arguments.length === 2 ) {
		// Assume `data` is `opts` and `opts` is `clbk`...
		return factory( data, opts )();
	}
	factory( opts, clbk )( data );
} // end FUNCTION post()


// EXPORTS //

module.exports = post;
