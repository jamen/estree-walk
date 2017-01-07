var test = require('tape')
var step = require('../').step
var esprima = require('esprima').parse

test('program', function (t) {
  t.plan(1)

  var program = esprima('function foo () { return 1 + 2 + 3 }')
  t.is(step(program), 1, 'walks program')
})
