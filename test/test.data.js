'use strict';

// MODULES //

var tape = require( 'tape' );
var data = require( './../lib/data.js' );


// FIXTURES //

var d = '{}';


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof data, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided a string, the function returns the input value', function test( t ) {
	var out = data( d );
	t.equal( out, d, 'returns a string' );
	t.end();
});

tape( 'if provided an object, the function serializes the input value', function test( t ) {
	var out = data( JSON.parse(d) );
	t.equal( out, d, 'returns a string' );
	t.end();
});
