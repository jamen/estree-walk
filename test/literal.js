var test = require('tape')
var step = require('../').step
var esprima = require('esprima').parse
var babylon = require('babylon').parse

test('literal', function (t) {
  t.plan(5)

  var number = esprima('123').body[0].expression
  t.is(step(number), null, 'does not walk number literal')

  var string = esprima('"Hello"').body[0].expression
  t.is(step(string), null, 'does not walk string literal')

  var boolean = esprima('true').body[0].expression
  t.is(step(boolean), null, 'does not walk boolean literal')

  var regex = esprima('/foo|bar/').body[0].expression
  t.is(step(regex), null, 'does not walk regex literal')

  var nul = esprima('null').body[0].expression
  t.is(step(nul), null, 'does not walk null literal')
})

test.skip('babylon literal', function (t) {
  t.plan(5)

  var number = babylon('123').body[0].expression
  t.is(step(number), null, 'does not walk number literal')

  var string = babylon('"Hello"').body[0].expression
  t.is(step(string), null, 'does not walk string literal')

  var boolean = babylon('true').body[0].expression
  t.is(step(boolean), null, 'does not walk boolean literal')

  var regex = babylon('/foo|bar/').body[0].expression
  t.is(step(regex), null, 'does not walk regex literal')

  var nul = babylon('null').body[0].expression
  t.is(step(nul), null, 'does not walk null literal')
})
