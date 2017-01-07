var test = require('tape')
var step = require('../').step
var esprima = require('esprima').parse

var MOD = { sourceType: 'module' }

test('import declaration', function (t) {
  t.plan(1)

  var node = esprima('import foo, {foo} from "bar"', MOD).body[0]
  t.is(step(node), 3, 'walks import declaration')
})

test('import specifier', function (t) {
  t.plan(2)

  var node = esprima('import {foo} from "bar"', MOD).body[0].specifiers[0]
  t.is(step(node), 2, 'import specifier')

  var node = esprima('import {foo as qux} from "bar"', MOD).body[0].specifiers[0]
  t.is(step(node), 2, 'import specifier')
})

test('import default specifier', function (t) {
  t.plan(1)

  var node = esprima('import foo from "bar"', MOD).body[0].specifiers[0]
  t.is(step(node), 1, 'walks default specifier')
})

test('import namespace specifier', function (t) {
  t.plan(1)

  var node = esprima('import * as foo from "bar"', MOD).body[0].specifiers[0]
  t.is(step(node), 1, 'walks namespace specifier')
})

test('export named declaration', function (t) {
  t.plan(3)

  var node = esprima('export var foo = 1', MOD).body[0]
  t.is(step(node), 1, 'walks export named declaration')

  var specif = esprima('export {foo, bar}', MOD).body[0]
  t.is(step(specif), 2, 'walks export named declaration specifiers')

  var source = esprima('export {foo, bar} from "source"', MOD).body[0]
  t.is(step(source), 3, 'walks export named declaration source')
})

test('export specifier', function (t) {
  t.plan(1)

  var node = esprima('export {foo, bar}', MOD).body[0].specifiers[0]
  t.is(step(node), 2, 'walks export specifier')
})

test('export default declaration', function (t) {
  t.plan(1)

  var node = esprima('export default 123', MOD).body[0]
  t.is(step(node), 1, 'walks export default declaration')
})

test('export all declaration', function (t) {
  t.plan(1)

  var node = esprima('export * from "foo"', MOD).body[0]
  t.is(step(node), 1, 'walks export all declaration')
})
