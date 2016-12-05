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
    case 'ClassBody':
    case 'BlockStatement': return pushMany(pending, node.body)
    case 'ArrayPattern':
    case 'ArrayExpression': return pushMany(pending, node.elements)
    case 'ObjectPattern':
    case 'ObjectExpression': return pushMany(pending, node.properties)
    case 'ExpressionStatement': return pending.push(node.expression)
    case 'WithStatement': return pending.push(node.object, node.body)
    case 'ReturnStatement': return node.argument ? pending.push(node.argument) : null
    case 'LabeledStatement': return pending.push(node.label, node.body)
    case 'BreakStatement':
    case 'ContinueStatement': return node.label ? pending.push(node.label) : null
    case 'IfStatement': return pending.push(node.test, node.consequent)
    case 'UnaryExpression':
    case 'UpdateExpression':
    case 'YieldExpression':
    case 'RestElement':
    case 'ThrowStatement': return pending.push(node.argument)
    case 'ClassDeclaration': return pending.push(node.id)
    case 'CatchCaluse': return pending.push(node.param, node.body)
    case 'DoWhileStatement':
    case 'WhileStatement': return pending.push(node.test, node.body)
    case 'ForOfStatement':
    case 'ForIntStatement': return pending.push(node.left, node.right, node.body)
    case 'VariableDeclaration': return pushMany(pending, node.declarations)
    case 'LogicalExpression':
    case 'AssignmentPattern':
    case 'AssignmentExpression':
    case 'BinaryExpression': return pending.push(node.left, node.right)
    case 'MemberExpression': return pending.push(node.object, node.property)
    case 'ConditionalExpression': return pending.push(node.test, node.alternative, node.consequent)
    case 'SequenceExpression': return pushMany(pending, node.expressions)
    case 'TaggedTemplateLiteral': return pending.push(node.tag, node.quasi)
    case 'AssignmentProperty': return pending.push(node.value)
    case 'MethodDefinition': return pending.push(node.key, node.value)
    case 'MetaProperty': return pending.push(node.meta, node.property)
    case 'ImportDefaultSpecifier':
    case 'ImportNamespaceSpecifier':
    case 'ModuleSpecifier': return pending.push(node.local)
    case 'ImportSpecifier': return pending.push(node.local, node.imported)
    case 'ExportSoecifier': return pending.push(node.local, node.exported)
    case 'ExportDefaultDeclaration': return pending.push(node.declaration)
    case 'ExportAllDeclaration': return pending.push(node.source)
    case 'ForStatement': {
      if (node.init) pending.push(node.init)
      if (node.test) pending.push(node.test)
      if (node.update) pending.push(node.update)
      return pending.push(node.body)
    }
    case 'TryStatement': {
      var _end = pending.push(node.block)
      if (node.handler) _end = pending.push(node.handler)
      if (node.finalizer) return pending.push(node.finalizer)
      return _end
    }
    case 'SwitchStatement': {
      pending.push(node.discriminant)
      return pushMany(pending, node.cases)
    }
    case 'SwitchCase': {
      if (node.test) pending.push(node.test)
      return pushMany(pending, node.consequent)
    }
    case 'Property': {
      if (node.key) pending.push(node.key)
      return pending.push(node.value)
    }
    case 'TemplateLiteral': {
      pushMany(pending, node.quasis)
      return pushMany(pending, node.expressions)
    }
    case 'Function':
    case 'FunctionExpression':
    case 'ArrowFunctionExpression':
    case 'FunctionDeclaration': {
      if (node.id) pending.push(node.id)
      pushMany(pending, node.params)
      return pending.push(node.body)
    }
    case 'NewExpression':
    case 'CallExpression': {
      pending.push(node.callee)
      return pushMany(pending, node.arguments)
    }
    case 'Class': {
      if (node.id) pending.push(node.id)
      if (node.superClass) pending.push(node.superClass)
      return pending.push(node.body)
    }
    default: return null
  }
  case 'ImportDeclaration': {
    pushMany(pending, node.specifiers)
    return pending.push(node.source)
  }
  case 'ExportNamedDeclaration': {
    if (node.declaration) pending.push(node.declaration)
    var _end = pushMany(pending, node.specifiers)
    if (node.source) return pending.push(node.source)
    return _end
  }
}
