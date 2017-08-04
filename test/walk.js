var test = require('tape')
var walk = require('../')
var esprima = require('esprima').parse

test('visitor pattern', function (t) {
  t.plan(3)

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

  var visits = 0
  walk(node, function (node, stop) {
    visits++
    if (visits === 3) {
      stop()
    }
  })
  t.is(visits, 3, 'exited early')
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
