'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isString = require( 'validate.io-string-primitive' );
var isNonNegativeInteger = require( 'validate.io-nonnegative-integer' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {String} [options.protocol] - request protocol
* @param {String} [options.hostname] - endpoint hostname
* @param {Number} [options.port] - endpoint port
* @param {String} [options.pathname] - resource pathname
* @param {String} [options.token] - Travis CI access token
* @param {String} [options.accept] - media type
* @param {String} [options.useragent] - user agent string
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'protocol' ) ) {
		opts.protocol = options.protocol;
		if ( !isString( opts.protocol ) ) {
			return new TypeError( 'invalid option. `protocol` option must be a string primitive. Option: `' + opts.protocol + '`.' );
		}
		if ( opts.protocol !== 'http' && opts.protocol !== 'https' ) {
			return new Error( 'invalid option. Protocol must be either `http` or `https`. Option: `' + opts.protocol + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'hostname' ) ) {
		opts.hostname = options.hostname;
		if ( !isString( opts.hostname ) ) {
			return new TypeError( 'invalid option. `hostname` option must be a string primitive. Option: `' + opts.hostname + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'port' ) ) {
		opts.port = options.port;
		if ( !isNonNegativeInteger( opts.port ) ) {
			return new TypeError( 'invalid option. `port` option must be a nonnegative integer. Option: `' + opts.port + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'pathname' ) ) {
		opts.pathname = options.pathname;
		if ( !isString( opts.pathname ) ) {
			return new TypeError( 'invalid option. `pathname` option must be a string primitive. Option: `' + opts.pathname + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'token' ) ) {
		opts.token = options.token;
		if ( !isString( opts.token ) ) {
			return new TypeError( 'invalid option. `token` option must be a string primitive. Option: `' + opts.token + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'accept' ) ) {
		opts.accept = options.accept;
		if ( !isString( opts.accept ) ) {
			return new TypeError( 'invalid option. `accept` option must be a string primitive. Option: `' + opts.accept + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'useragent' ) ) {
		opts.useragent = options.useragent;
		if ( !isString( opts.useragent ) ) {
			return new TypeError( 'invalid option. `useragent` option must be a string primitive. Option: `' + opts.useragent + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
