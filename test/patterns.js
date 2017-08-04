var test = require('tape')
var step = require('../').step
var esprima = require('esprima').parse

test('identifier pattern', function (t) {
  t.plan(1)

  var id = esprima('foo').body[0].expression
  t.false(step(id, []),  'does not walk identifier pattern')
})

test('object pattern', function (t) {
  t.plan(1)

  var node = esprima('var {foo, bar} = bar').body[0].declarations[0].id
  t.true(step(node, []),  'walks object pattern')
})

test('array pattern', function (t) {
  t.plan(1)

  var node = esprima('var [foo, bar] = bar').body[0].declarations[0].id
  t.true(step(node, []),  'walks object pattern')
})

test('assignment pattern', function (t) {
  t.plan(1)

  var asin = esprima('var {foo = 123} = bar').body[0].declarations[0].id.properties[0].value
  t.true(step(asin, []),  'walks assignment pattern')
})
