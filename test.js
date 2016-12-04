var test = require('tape')
var esprima = require('esprima')
var walk = require('./')

test('walks esprima', function (t) {
  t.plan(1)

  // Stupid dummy code
  var foo = esprima.parse(`
    function foo (x, y) {
      if (x + y > 5) {
        switch (y) {
          case 1: return x + 1
        }
      }
    }
  `)

  var expectedReturn = foo.body[0].body.body[0].consequent.body[0].cases[0].consequent[0]
  walk(foo, 'ReturnStatement', function (node) {
    t.is(node, expectedReturn, 'found node')
  })
})
