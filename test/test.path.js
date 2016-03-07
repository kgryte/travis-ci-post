'use strict';

// MODULES //

var tape = require( 'tape' );
var path = require( './../lib/path.js' );


// FUNCTION //

function setup() {
	return {
		'pathname': '/settings/env_vars',
		'query': ''
	};
}


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.equal( typeof path, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a resource path', function test( t ) {
	var expected;
	var actual;

	expected = '/settings/env_vars';
	actual = path( setup() );

	t.equal( actual, expected, 'returns a resource path' );
	t.end();
});

tape( 'the function returns a resource path (query string)', function test( t ) {
	var expected;
	var actual;
	var opts;

	expected = '/settings/env_vars?repository_id=4114463';

	opts = setup();
	opts.query = 'repository_id=4114463';

	actual = path( opts );

	t.equal( actual, expected, 'returns a resource path' );
	t.end();
});
