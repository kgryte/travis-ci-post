'use strict';

var request = require( './../lib' );

var opts = {
	'hostname': 'api.travis-ci.org',
	'pathname': '/builds/114143550/restart',

	// INSERT TOKEN HERE //
	'token': '<your_token_goes_here>'
};

request( opts, onResponse );

/**
* FUNCTION: onResponse( error, results )
*	Callback invoked upon receiving a response.
*
* @private
* @param {Error|Null} error - error or null
* @param {Object} results - response results
* @returns {Void}
*/
function onResponse( error, results ) {
	if ( error ) {
		throw new Error( error.message );
	}
	console.log( results );
}
