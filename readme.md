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

Functions for walking [ESTree](https://github.com/estree/estree) nodes.  Like others, it attempts to stay future-proof by enumerating the node's keys instead of handling the node's type, while also providing simple usage.

## Installation

```sh
npm i estree-walk
```

## Usage

There is two methods of walking trees with this library:

 - Using a visitor pattern with `walk(node, visitor)`
 - Using a looping pattern with `walk.step(node, queue)`

### `walk(node, visitor)`

Walks a node tree using a visitor.  A visitor can be:

 - Functions that execute for a specific node type.
 - Function that executes for all nodes.

Visitor functions have the signature `(node, stop?)`, where `stop` is a function used for quickly exiting (that is, prevent visiting subsequent nodes)

```js
walk(node, {
  // Example of visitor by node type
  FunctionDeclaration: function (node) {
    console.log(node.id)
  },

  // Example of visitor using `stop`
  ImportDeclaration: function (node, stop) {
    if (isRelative(node.source.value)) {
      stop()
    }
  }
})

// Example of visitor for all node types
walk(node, function (node) {
  console.log(node.type, node.loc)
})
```

### `walk.step(node, queue)`

An alternative to the visitor pattern is a loop pattern, which can provide a much faster way to walk trees, but at the price of extra maintence.

The function simply scans `node` for possible children, and pushes them onto `queue`.  This can be used inside of a loop to walk the tree:

```js
// Start loop with a source node:
for (var queue = [mainNode]; queue.length;) {
  var node = pending.shift()
  // handle `node` with a switch or whatever
  // then walk using step function:
  walk.step(node, pending)
}
```

This method is _much_ faster than a visitor pattern at the cost of less understandable code (as it is used internally to create the visitors).  The visitor pattern is likely fast enough for most cases where it is preferred over this.

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/estree-walk.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/estree-walk.svg?style=flat-square)](https://travis-ci.org/jamen/estree-walk) [![downloads](https://img.shields.io/npm/dt/estree-walk.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/estree-walk.svg?style=flat-square)][package] [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/estree-walk
