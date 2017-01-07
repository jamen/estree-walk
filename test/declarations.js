var test = require('tape')
var step = require('../').step
var esprima = require('esprima').parse

test('function declaration', function (t) {
  t.plan(1)

  var node = esprima('function foo(x,y,z){a();b()}').body[0]
  t.is(step(node), 5, 'walks function declaration')
})

test('variable declaration', function (t) {
  t.plan(2)

  var node = esprima('var foo = 1').body[0]
  t.is(step(node), 1, 'walks variable declaration')

  var node2 = esprima('var foo = 1, bar = 2').body[0]
  t.is(step(node2), 2, 'walks variable declaration with multiple')
})

test('variable declarator', function (t) {
  t.plan(2)

  var node = esprima('var foo = 1').body[0].declarations[0]
  t.is(step(node), 2, 'walks variable declarator')

  var node2 = esprima('var foo').body[0].declarations[0]
  t.is(step(node2), 1, 'walks empty variable declarator')
})
