var test = require('tape')
var step = require('../').step
var esprima = require('esprima').parse

test('this expression', function (t) {
  t.plan(1)

  var node = esprima('this').body[0].expression
  t.is(step(node), null, 'does not walk this expression')
})

test('array expression', function (t) {
  t.plan(2)

  var node = esprima('[1, 2, foo]').body[0].expression
  t.is(step(node), 3, 'walks array expression')

  var spread = esprima('[1, ...two, 3]').body[0].expression.elements[1]
  t.is(step(spread), 1, 'walks array expression spread element')
})

test('object expression', function (t) {
  t.plan(1)

  var node = esprima('({ foo: 1, bar: 2 })').body[0].expression
  t.is(step(node), 2, 'walks object expression')
})

test('property', function (t) {
  t.plan(1)

  var node = esprima('({ foo: 1 })').body[0].expression.properties[0]
  t.is(step(node), 2, 'walks property')
})

test('function expression', function (t) {
  t.plan(1)

  var node = esprima('(function (x, y) {a()})').body[0].expression
  t.is(step(node), 3, 'walks function expression')
})

test('unary expression', function (t) {
  t.plan(2)

  var node = esprima('+2').body[0].expression
  t.is(step(node), 1, 'walks + unary expression')

  var node2 = esprima('!foo').body[0].expression
  t.is(step(node2), 1, 'walks ! unary expression')
})

test('update expression', function (t) {
  t.plan(2)

  var node = esprima('foo++').body[0]
  t.is(step(node), 1, 'walks ++ update expression')

  var node2 = esprima('--foo').body[0]
  t.is(step(node2), 1, 'walks -- update expression')
})

test('binary expression', function (t) {
  t.plan(2)

  var node = esprima('1 + 2').body[0].expression
  t.is(step(node), 2, 'walks + binary expression')

  var node2 = esprima('e instanceof b').body[0].expression
  t.is(step(node), 2, 'walks instanceof binary expression')
})

test('assignment expression', function (t) {
  t.plan(2)

  var node = esprima('(foo = 123)').body[0].expression
  t.is(step(node), 2, 'walks = assignment expression')

  var node2 = esprima('(foo >>>= 4)').body[0].expression
  t.is(step(node2), 2, 'walks >>>= assignment expression')
})

test('logical expression', function (t) {
  t.plan(2)

  var node = esprima('foo && bar').body[0].expression
  t.is(step(node), 2, 'walks && logical expression')

  var node2 = esprima('bar || qux').body[0].expression
  t.is(step(node), 2, 'walks || logical expression')
})

test('member expression', function (t) {
  t.plan(1)

  var node = esprima('foo.bar').body[0].expression
  t.is(step(node), 2, 'walks member expression')
})

test('conditional expression', function (t) {
  t.plan(1)

  var node = esprima('foo ? bar : baz').body[0].expression
  t.is(step(node), 3, 'walks conditional expression')
})

test('call expression', function (t) {
  t.plan(2)

  var node = esprima('foo(1, 2, 3)').body[0].expression
  t.is(step(node), 4, 'walks call expression')

  var spread = esprima('foo(1, ...two, 3)').body[0].expression.arguments[1]
  t.is(step(spread), 1, 'walks call expression spread element')
})

test('new expression', function (t) {
  t.plan(2)

  var node = esprima('new Foo(1, 2)').body[0].expression
  t.is(step(node), 3, 'walks new expression')

  var spread = esprima('new Foo(1, ...two)').body[0].expression.arguments[1]
  t.is(step(spread), 1, 'walks new expression spread element')
})

test('sequence expression', function (t) {
  t.plan(1)

  var node = esprima('foo = 1, 0, baz(), bar = 2').body[0].expression
  t.is(step(node), 4, 'walks sequence expression')
})

test('arrow function expression', function (t) {
  t.plan(1)

  var node = esprima('(x, y) => foo').body[0].expression
  t.is(step(node), 3, 'walks arrow function expression')
})

test('yield expression', function (t) {
  t.plan(2)

  var node = esprima('function* foo () { yield 10 }').body[0].body.body[0].expression
  t.is(step(node), 1, 'walks yield expression')

  var empty = esprima('function* foo () { yield }').body[0].body.body[0].expression
  t.is(step(empty), null, 'does not walk empty yield expression')
})

test('template literal', function (t) {
  t.plan(1)

  var node = esprima('`foo${123}bar`').body[0].expression
  t.is(step(node), 3, 'walks template literal')
})

test('tagged template literal', function (t) {
  t.plan(1)

  var node = esprima('foo`bar${baz}qux`').body[0].expression
  t.is(step(node), 2, 'walks tagged template literal')
})

test('template element', function (t) {
  t.plan(1)

  var node = esprima('`foo${bar}baz`').body[0].expression.quasis[0]
  t.is(step(node), null, 'does not walk template element')
})
