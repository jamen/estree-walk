var test = require('tape')
var walk = require('../')
var esprima = require('esprima').parse

test('visitor pattern', function (t) {
  t.plan(2)

  var node = esprima(`
    function foo () {
      console.log('example')
      return e => {
        for (var k of e) {
          if (e[k] != null) break
        }
      }
    }
  `)

  walk(node, {
    Literal: function (node) {
      t.true(node, 'visited literal')
    }
  })
})


test('when node is null', function (t) {
  t.plan(1)

  var handler = {
    MemberExpression: function (node) {}
  }

  t.doesNotThrow(function() {
    walk(undefined, handler)
  }, 'should not throw error')
})
