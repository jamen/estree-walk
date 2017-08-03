var test = require('tape')
var walk = require('../')
var esprima = require('esprima').parse

test('when node is null', function (t) {
  t.plan(1)

  var handler = {
    MemberExpression: function (node) {}
  }

  t.doesNotThrow(function() {
    walk(undefined, handler)
  }, 'should not throw error')
})
