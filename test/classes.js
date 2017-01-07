var test = require('tape')
var step = require('../').step
var esprima = require('esprima').parse

test('class declaration', function (t) {
  t.plan(2)

  var node = esprima('class Foo{foo(x,y){z()}}').body[0]
  t.is(step(node), 2, 'walks class declaration')

  var extend = esprima('class Foo extends bar{f(x){y()}}').body[0]
  t.is(step(extend), 3, 'walks class/extend declaration')
})

test('class expression', function (t) {
  t.plan(2)

  var node2 = esprima('(class Foo{foo(){}})').body[0].expression
  t.is(step(node2), 2, 'walks class expression')

  var node = esprima('(class{foo(){}})').body[0].expression
  t.is(step(node), 1, 'walks no-id class expression')
})

test('class body', function (t) {
  t.plan(1)

  var node = esprima('class Foo{foo(){}; bar(){}}').body[0].body
  t.is(step(node), 2, 'walks class body')
})

test('method definition', function (t) {
  t.plan(1)

  var node = esprima('class Foo{foo(x,y){z()}}').body[0].body.body[0]
  t.is(step(node), 2, 'walks method definition')
})

test('meta property', function (t) {
  t.plan(1)

  var node = esprima('function foo() { new.target }').body[0].body.body[0].expression
  t.is(step(node), 2, 'walks method definition')
})
