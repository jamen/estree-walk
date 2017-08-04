var test = require('tape')
var step = require('../').step
var esprima = require('esprima').parse
var babylon = require('babylon').parse

test('literal', function (t) {
  t.plan(5)

  var number = esprima('123').body[0].expression
  t.false(step(number, []),  'does not walk number literal')

  var string = esprima('"Hello"').body[0].expression
  t.false(step(string, []),  'does not walk string literal')

  var boolean = esprima('true').body[0].expression
  t.false(step(boolean, []),  'does not walk boolean literal')

  var regex = esprima('/foo|bar/').body[0].expression
  t.false(step(regex, []),  'does not walk regex literal')

  var nul = esprima('null').body[0].expression
  t.false(step(nul, []),  'does not walk null literal')
})

test.skip('babylon literal', function (t) {
  t.plan(5)

  var number = babylon('123').body[0].expression
  t.false(step(number, []),  'does not walk number literal')

  var string = babylon('"Hello"').body[0].expression
  t.false(step(string, []),  'does not walk string literal')

  var boolean = babylon('true').body[0].expression
  t.false(step(boolean, []),  'does not walk boolean literal')

  var regex = babylon('/foo|bar/').body[0].expression
  t.false(step(regex, []),  'does not walk regex literal')

  var nul = babylon('null').body[0].expression
  t.false(step(nul, []),  'does not walk null literal')
})
