var free = require('free-context')
var pushMany = free(Array.prototype.push, true)

walk.step = step
module.exports = walk

function walk (node, types, found) {
  if (!found) found = types, types = null
  var pending = [node]
  if (!types) {
    while (pending.length) {
      node = pending.shift()
      found(node)
      step(node, pending)
    }
  } else {
    while (pending.length) {
      node = pending.shift()
      if (types.indexOf(node.type) !== -1) found(node)
      step(node, pending)
    }
  }
}

function step (node, pending) {
  switch (node.type) {
    case 'Program':
    case 'BlockStatement':
      return pushMany(pending, node.body)
    case 'ArrayExpression':
      return pushMany(pending, node.elements)
    case 'ObjectExpression':
      return pushMany(pending, node.propreties)
    case 'CallExpression':
      return pushMany(pending, node.arguments)
    case 'FunctionExpression':
    case 'ExpressionStatement':
      return pending.push(node.expression)
    case 'FunctionDeclaration':
      return pending.push(node.body)
    case 'Property':
      return pending.push(node.value)
    case 'IfStatement':
      return pending.push(node.test, node.consequent)
    case 'SwitchStatement':
      return pushMany(pending, node.cases.concat(node.discriminant))
    case 'SwitchCase':
      return pushMany(pending, node.consequent.concat(node.test))
  }
}
