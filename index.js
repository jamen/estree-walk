
module.exports = walk
walk.step = step

const blacklistedKeys = [
  'parent',
];

function walk (node, visitor) {
  var all = typeof visitor === 'function'
  var walking = true

  function stop () {
    walking = false
  }

  for (var queue = [node]; queue.length && walking;) {
    node = queue.shift()

    // Skip a missing node
    if (!node) continue

    // Execute visitor
    var handle = all ? visitor : visitor[node.type]
    if (handle) handle(node, stop)

    // Continue walking
    if (walking) step(node, queue)
  }
}

function step (node, queue) {
  var before = queue.length

  // Enumerate keys for possible children
  for (var key in node) {
    if (blacklistedKeys.indexOf(key) >= 0) continue;

    var child = node[key]

    if (child && child.type) {
      queue.push(child)
    }

    if (Array.isArray(child)) {
      for (var i = 0; i < child.length; i++) {
        var item = child[i]
        if (item && item.type) {
          queue.push(item)
        }
      }
    }
  }

  // Return whether any children were pushed
  return queue.length !== before
}
