
module.exports = walk
walk.step = step

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
    step(node, queue)
  }
}

function step (node, queue) {
  var before = queue.length

  for (var key in node) {
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

  if (queue.length != before) {
    return true
  }
}
