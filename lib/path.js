'use strict';

/**
* FUNCTION: path( opts )
*	Returns a resource path (pathname + search).
*
* @param {Object} opts - function options
* @param {String} opts.pathname - resource pathname
* @param {String} opts.query - params portion of a query string
* @returns {String} resource path
*/
function path( opts ) {
	var search = '';
	if ( opts.query ) {
		search = '?'+opts.query;
	}
	return opts.pathname + search;
} // end FUNCTION path()


// EXPORTS //

module.exports = path;
