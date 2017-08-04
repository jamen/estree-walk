
module.exports = walk
walk.step = step

var BREAK_TOKEN = {}

function walk (node, handler) {
  var all = typeof handler === 'function'
  for (var pending = [node]; pending.length;) {
    node = pending.shift()
    if (!node) continue;
    var handle = all ? handler : handler[node.type]
    if (handle && (handle(node, BREAK_TOKEN) === BREAK_TOKEN)) {
      break
    }
    step(node, pending)
  }
}

function step (node, pending) {
  for (var key in node) {
    var child = node[key]

    if (child && child.type) {
      pending.push(child)
      return true
    }
    
    if (Array.isArray(child)) {
      var stepped
      
      for (var i = 0; i < child.length; i++) {
        var item = child[i]
        if (item && item.type) {
          stepped = pending.push(item)
        }
      }

      if (stepped) {
        return true
      }
    }
  }
}
