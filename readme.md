# estree-walk

> Walk ESTree nodes simple and fast

```js
walk(source, {
  ReturnStatement: function (node, stop) {
    // Return to continue loop
    // Return `stop` to break loop
  }
})

// A fast alternative:
for (var q = [source], node; node = q.pop(); walk.step(node, q)) {
  switch (node.type) {
    // ...
  }
}
```

A function walks an [ESTree](https://github.com/estree) node. It is readable and fast for most, so you get the best of both worlds.  Alternatively, `walk.step` lets you walk without callbacks.  Not as readable, but benchmarks 3 times faster than `walk` for me.  Run `bench.js` for more info.

## Installation

```sh
$ npm install --save estree-walk
```

## Usage

### `walk(node, handler)`

Walk the `node`'s children, calling `handler` for anything that matches.  It can be an object of node types with functions, or a single function to handle all types

 - `node` ([ESTree `Node`](https://github.com/estree/estree/blob/master/es5.md#node-objects)): The starting node to walk
 - `handler` (`Function`|`Object`): Object of types -> functions, or a single function

The `handler` is is called with `(node, stop)`.  If you return `stop` in the callback, the loop breaks instead of continuing, for fast exits

```js
walk(node, [
  // Example of `stop`:
  ImportDeclaration: function (node, stop) {
    if (isRelative(node.source.value)) {
      return stop
    }
  },

  // Other handlers:
  FunctionDeclaration: function (node) { /* ... */ },
  VariableDeclaration: function (node) { /* ... */ }
])

// Handle all nodes:
walk(node, function (node) {
  if (node.type === 'AssignmentExpression') {
    // ...
  }
})
```

### `walk.step(node, [pending])`

Instead of callbacks, you can use `step` to get the children of a node. Use this in a loop to walk a tree

 - `node` (ESTree `Node`): Node you are resolving children of
 - `pending` (`Array`): Array the children are pushed on

Example of walking a tree:

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
