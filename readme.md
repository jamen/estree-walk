# estree-walk

> Walk ESTree nodes simple and fast

```js
walk(source, {
  ReturnStatement: function (node, stop) {
    // Return to continue loop
    // Return `stop` to break loop
  }.
  // ...
})

walk(source, function (node, stop) {
  // Walk all nodes in tree
})
```

## Installation

```sh
$ npm install --save estree-walk
```

## Usage

### `walk(node, handler)`

Walk the given node and call the `found` function when any of the provided `types` are found.  If no types are provided, it calls for every node in the tree.

 - `node` ([ESTree `Node`](https://github.com/estree/estree/blob/master/es5.md#node-objects)): A root `Node` to walk.
 - `handler` (`Function`|`Object`): An object of node types of handle, or a function to handle all nodes.

The `handler` is is called with `(node, stop)`.  If you return `stop` in the callback, the loop breaks instead of continuing, for fast exits.

```js
walk(node, [
  FunctionDeclaration: function (node) { /* ... */ },
  VariableDeclaration: function (node) { /* ... */ },
  ImportDeclaration: function (node) { /* ... */ }
])

walk(node, function (node) {
  if (node.type === 'AssignmentExpression') {
    // ...
  }
})
```

### `walk.step(node, pending)`

Alternative to callbacks, you can use `walk.step` to resolve the children of a node.

 - `node` (ESTree `Node`): Node you are resolving children of
 - `pending` (`Array`): Array the children are pushed on

You can walk the tree pretty easily with a plain loop this way:

```js
for (var pending = [source]; pending.length;) {
  var node = pending.shift()
  // continue or break loop normally
  // handle `node` with a switch or whatever
  // then walk node using this:
  walk.step(node, pending)
}
```

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/estree-walk.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/estree-walk.svg?style=flat-square)](https://travis-ci.org/jamen/estree-walk) [![downloads](https://img.shields.io/npm/dt/estree-walk.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/estree-walk.svg?style=flat-square)][package] [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/estree-walk
