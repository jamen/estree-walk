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

  t.doesNotThrow(function () {
    walk(undefined, handler)
  })
})

test('ignores parent', function (t) {
  t.plan(1)
  
  var node = esprima('100 + 50')
  var expr = node.body[0].expression

  // Create some fake `parent` things
  expr.parent = node
  expr.left.parent = expr
  expr.right.parent = expr

  var walked = 0
    
  walk(node, function (node, stop) {
    if (walked > 5) stop()
    walked++
  })

  t.is(walked, 5, 'didn\'t loop forever')
})

