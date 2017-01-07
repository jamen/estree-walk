var walk = require('./')
var Suite = require('benchmark').Benchmark.Suite
var bench = new Suite('walk')

var esprima = require('esprima')
var source = esprima.parse(`
function foo (x, done) {
  if (x > 5) {
    return done(null, function (foo) {
      if (foo !== null) {
        return foo(function (x, y) {
          switch (x * y) {
            case 11: {
              return 'Hello'
            }
          }
        })
      }
    }, function (x, y) {
      switch (x + y) {
        case 10: {
          return 123
        }
        default: {
          return 'world'
        }
      }
    })
  }
}
`)

// Goal: find the string literals

var string1, string2
var handle = {
  Literal: function (node, stop) {
    if (string2) return stop
    if (typeof node.value === 'string') {
      if (string1) string2 = node
      else string1 = node
    }
  }
}

bench.add('walk regular', function () {
  walk(source, handle)
})

bench.add('walk step + shift loop', function () {
  for (var pending = [source]; pending.length && !string2;) {
    var node = pending.shift()
    if (node.type === 'Literal' && typeof node.value === 'string') {
      if (string1) string2 = node
      else string1 = node
    }
    walk.step(node, pending)
  }
})


bench.add('walk step + pop loop', function () {
  for (var pending = [source]; pending.length && !string2;) {
    var node = pending.pop()
    if (node.type === 'Literal' && typeof node.value === 'string') {
      if (string1) string2 = node
      else string1 = node
    }
    walk.step(node, pending)
  }
})

// Run the stuff:
bench.on('cycle', function(event) {
  console.log(String(event.target))
})
bench.on('error', console.error)
bench.run()
