var test = require('tape')
var step = require('../').step
var esprima = require('esprima').parse

test('class declaration', function (t) {
  t.plan(2)

  var node = esprima('class Foo{foo(x,y){z()}}').body[0]
  t.true(step(node, []),  'walks class declaration')

  var extend = esprima('class Foo extends bar{f(x){y()}}').body[0]
  t.true(step(extend, []),  'walks class/extend declaration')
})

test('class expression', function (t) {
  t.plan(2)

  var node2 = esprima('(class Foo{foo(){}})').body[0].expression
  t.true(step(node2, []),  'walks class expression')

  var node = esprima('(class{foo(){}})').body[0].expression
  t.true(step(node, []),  'walks no-id class expression')
})

test('class body', function (t) {
  t.plan(1)

  var node = esprima('class Foo{foo(){}; bar(){}}').body[0].body
  t.true(step(node, []),  'walks class body')
})

test('method definition', function (t) {
  t.plan(1)

  var node = esprima('class Foo{foo(x,y){z()}}').body[0].body.body[0]
  t.true(step(node, []),  'walks method definition')
})

test('meta property', function (t) {
  t.plan(1)

  var node = esprima('function foo() { new.target }').body[0].body.body[0].expression
  t.true(step(node, []),  'walks method definition')
})
