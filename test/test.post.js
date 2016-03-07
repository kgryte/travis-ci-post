'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var noop = require( '@kgryte/noop' );
var post = require( './../lib/post.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var results = require( './fixtures/results.json' );
var data = '{}';


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof post, 'function', 'export is a function' );
	t.end();
});

tape( 'function throws an error if provided a `data` argument which is neither a string or an object', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		5,
		NaN,
		true,
		null,
		undefined,
		[],
		function(){}
	];

	opts = getOpts();
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			post( value, opts, noop );
		};
	}
});

tape( 'function throws an error if provided an invalid option', function test( t ) {
	t.throws( foo, TypeError, 'invalid options argument' );
	t.throws( bar, TypeError, 'invalid option' );
	t.end();

	function foo() {
		post( data, null, noop );
	}
	function bar() {
		post( data, {'port':'beep'}, noop );
	}
});

tape( 'function throws if provided a callback argument which is not a function', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{}
	];

	opts = getOpts();
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			post( data, opts, value );
		};
	}
});

tape( 'function returns an error to a provided callback if an error is encountered when making a request', function test( t ) {
	var post;
	var opts;

	post = proxyquire( './../lib/post.js', {
		'./factory.js': factory
	});

	opts = getOpts();
	post( data, opts, done );

	function factory( opts, clbk ) {
		return function query() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( new Error( 'beep' ) );
			}
		};
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

tape( 'function does not require request data', function test( t ) {
	var post;
	var opts;

	post = proxyquire( './../lib/post.js', {
		'./factory.js': factory
	});

	opts = getOpts();
	post( opts, done );

	function factory( opts, clbk ) {
		return function query() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( new Error( 'beep' ) );
			}
		};
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

tape( 'function returns response data to a provided callback', function test( t ) {
	var expected;
	var post;
	var opts;

	post = proxyquire( './../lib/post.js', {
		'./factory.js': factory
	});

	expected = results;

	opts = getOpts();
	post( data, opts, done );

	function factory( opts, clbk ) {
		return function query() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, results );
			}
		};
	}

	function done( error, data ) {
		t.deepEqual( data, expected, 'deep equal' );
		t.end();
	}
});
