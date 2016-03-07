'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var query = require( './../lib/query.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var results = require( './fixtures/results.json' );
var data = '{"hook":{"id":42,"active":true}}';


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof query, 'function', 'export is a function' );
	t.end();
});

tape( 'function returns an error to a provided callback if an error is encountered when querying an endpoint', function test( t ) {
	var query;
	var opts;

	query = proxyquire( './../lib/query.js', {
		'./request.js': request
	});

	opts = getOpts();
	query( data, opts, done );

	function request( opts, data, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ) );
		}
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

tape( 'function returns response data to a provided callback', function test( t ) {
	var expected;
	var query;
	var opts;

	query = proxyquire( './../lib/query.js', {
		'./request.js': request
	});

	expected = results;

	opts = getOpts();
	query( data, opts, done );

	function request( opts, data, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, {}, results );
		}
	}

	function done( error, results ) {
		t.deepEqual( results, expected, 'deep equal' );
		t.end();
	}
});
