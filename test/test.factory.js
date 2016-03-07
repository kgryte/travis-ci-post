'use strict';

// MODULES //

var tape = require( 'tape' );
var proxyquire = require( 'proxyquire' );
var noop = require( '@kgryte/noop' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var results = require( './fixtures/results.json' );
var data = '{"hook":{"id":42,"active":true}}';


// TESTS //

tape( 'file exports a function', function test( t ) {
	t.equal( typeof factory, 'function', 'export is a function' );
	t.end();
});

tape( 'function throws an error if provided an invalid option', function test( t ) {
	t.throws( foo, TypeError, 'invalid options argument' );
	t.throws( bar, TypeError, 'invalid option' );
	t.end();

	function foo() {
		factory( null, noop );
	}
	function bar() {
		factory( {'port':'beep'}, noop );
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
			factory( opts, value );
		};
	}
});

tape( 'function returns a function', function test( t ) {
	t.equal( typeof factory( getOpts(), noop ), 'function', 'returns a function' );
	t.end();
});

tape( 'if a `port` option is not specified and the protocol is `https`, the default port is `443`', function test( t ) {
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'./query.js': query
	});

	opts = getOpts();
	opts.protocol = 'https';
	delete opts.port;

	fcn = factory( opts, noop );
	fcn( data );

	function query( data, opts ) {
		t.equal( opts.port, 443, 'sets the default port to `443` for HTTPS' );
		t.end();
	}
});

tape( 'if a `port` option is not specified and the protocol is `http`, the default port is `80`', function test( t ) {
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'./query.js': query
	});

	opts = getOpts();
	opts.protocol = 'http';
	delete opts.port;

	fcn = factory( opts, noop );
	fcn( data );

	function query( data, opts ) {
		t.equal( opts.port, 80, 'sets the default port to `80` for HTTP' );
		t.end();
	}
});

tape( 'function returns a function which throws if provided a data argument which is neither a string or an object', function test( t ) {
	var values;
	var opts;
	var fcn;
	var i;

	values = [
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		function(){}
	];

	opts = getOpts();
	fcn = factory( opts, noop );
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			fcn( value );
		};
	}
});

tape( 'function returns a function which returns an error to a provided callback if an error is encountered when updating resources', function test( t ) {
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'./query.js': query
	});

	opts = getOpts();
	fcn = factory( opts, done );
	fcn( data );

	function query( data, opts, clbk ) {
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

tape( 'function returns a function which returns response data to a provided callback', function test( t ) {
	var expected;
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'./query.js': query
	});

	expected = results;

	opts = getOpts();
	fcn = factory( opts, done );
	fcn( data );

	function query( data, opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, results );
		}
	}

	function done( error, data ) {
		t.deepEqual( data, expected, 'deep equal' );
		t.end();
	}
});

tape( 'function returns a function which returns response data to a provided callback (no request data)', function test( t ) {
	var expected;
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'./query.js': query
	});

	expected = results;

	opts = getOpts();
	fcn = factory( opts, done );
	fcn();

	function query( data, opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, results );
		}
	}

	function done( error, data ) {
		t.deepEqual( data, expected, 'deep equal' );
		t.end();
	}
});
