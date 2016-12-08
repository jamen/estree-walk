# estree-walk

> Simple and fast Estree walking.

## Installation

```sh
$ npm install --save estree-walk
```

## Usage

### `walk(node, [types], found)`

Walk the given node and call the `found` function when any of the provided `types` are found.  If no types are provided, it calls for every node in the tree.

```js
walk(node, [
  'ReturnStatement',
  'SwitchCase',
  'FunctionDeclaration'
], function (node) {
  // ...
})
```

#### Parameters

 - `node` ([Estree `Node`](https://github.com/estree/estree/blob/master/es5.md#node-objects)): The node you want to walk.
 - `types` (`Array`): Types of nodes you are looking for.  If missing, assumes all nodes.
 - `found` (`Function`): Called with a node when it matches your types.

### `walk.step(node, pending)`

Resolve the children of a node and push them to `pending`.  Useful for creating fast custom walkers.

```js
for (var pending = [node]; pending.length;) {
  var sel = pending.shift()
  // do stuff...
  // then walk node:
  walk.step(node, pending)
}
```

#### Parameters

 - `node` (Estree `Node`): The node of your current iteration.
 - `pending` (`Array`): An array where you want to push the children nodes.

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/estree-walk.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/estree-walk.svg?style=flat-square)](https://travis-ci.org/jamen/estree-walk) [![downloads](https://img.shields.io/npm/dt/estree-walk.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/estree-walk.svg?style=flat-square)][package] [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/estree-walk
