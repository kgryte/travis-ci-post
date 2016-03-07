'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' );


// DATA //

/**
* FUNCTION: data( d )
*	Serializes request data.
*
* @param {String|Object} d - request data
* @returns {String} serialized request data
*/
function data( d ) {
	if ( isString( d ) ) {
		return d;
	}
	return JSON.stringify( d );
} // end FUNCTION data()


// EXPORTS //

module.exports = data;
