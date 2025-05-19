# Tree Helpers

[![npm version](https://img.shields.io/npm/v/@domeadev/tree-helpers.svg)](https://www.npmjs.com/package/@domeadev/tree-helpers)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A collection of TypeScript utility functions for managing tree data structures, focusing on operations like navigation, manipulation, and state management of hierarchical data.

## Installation

### npm

```bash
npm install @domeadev/tree-helpers
```

### Yarn

```bash
yarn add @domeadev/tree-helpers
```

### pnpm

```bash
pnpm add @domeadev/tree-helpers
```

## Core Concepts

Tree Helpers works with these basic concepts:

- **Nodes**: Any object with a unique key identifier
- **Trees**: Hierarchical structures where nodes can have child nodes
- **CheckedState**: For checkable trees, a collection of keys representing checked nodes

## API Reference

### Tree Navigation

#### `walkNodes(nodes, getChildren, fn)`

Walks through all nodes in a tree, executing a callback function on each one.

```typescript
walkNodes<T>(
  nodes: T[],
  getChildren: (node: T) => T[] | undefined,
  fn: (node: T, children: T[] | undefined) => void
): void
```

#### `flattenNodes(nodes, getChildren)`

Flattens a tree structure into a single-level collection.

```typescript
flattenNodes<T>(
  nodes: T[],
  getChildren: (node: T) => T[]
): Set<T>
```

#### `getAncestorKeys(keyToChildKeysMap, key)`

Gets all ancestor keys for a given node key.

```typescript
getAncestorKeys(
  keyToChildKeysMap: KeyToChildKeysMap,
  key: NodeKey
): NodeKey[]
```

### Tree Construction

#### `makeNodesMap(nodes, getKey, getChildren)`

Creates a map of nodes indexed by their keys.

```typescript
makeNodesMap<T>(
  nodes: T[],
  getKey: (node: T) => NodeKey,
  getChildren: (node: T) => T[]
): Map<NodeKey, T>
```

#### `makeKeyToChildKeysMap(tree, getKey, getChildren)`

Creates a map that relates each node key to its child keys.

```typescript
makeKeyToChildKeysMap<T>(
  tree: T[],
  getKey: (n: T) => NodeKey,
  getChildren: (n: T) => T[] | undefined
): KeyToChildKeysMap
```

#### `makeRowsTree({ rows, getKey, getChildren, rootKeys, childrenKey })`

Transforms a flat array of rows into a hierarchical tree structure.

```typescript
makeRowsTree<T extends object, ChildrenKey extends string>({
  rows,
  getKey,
  getChildren,
  rootKeys,
  childrenKey,
}: {
  rows: T[];
  getKey: (node: T) => NodeKey;
  getChildren: (node: T) => T[];
  rootKeys: NodeKey[];
  childrenKey: ChildrenKey;
}): TreeNode<T, ChildrenKey>[]
```

### Tree Manipulation

#### `removeNodeKey(keyToChildKeysMap, keyToRemove)`

Removes a node and all its descendants from the key-to-child-keys map.

```typescript
removeNodeKey(
  keyToChildKeysMap: KeyToChildKeysMap,
  keyToRemove: NodeKey
): KeyToChildKeysMap
```

### Checkable Tree Operations

#### `toggleNodeCheckedState(keyToChildKeysMap, checkedState, currentNode)`

Toggles a node's checked state and updates its children and ancestors accordingly.

```typescript
toggleNodeCheckedState(
  keyToChildKeysMap: KeyToChildKeysMap,
  checkedState: CheckedState,
  currentNode: CheckableNode
): Set<NodeKey>
```

#### `autoUncheckParentNode(keyToChildKeysMap, unCheckedKey, checkedState)`

Automatically unchecks a parent node when all its children are unchecked.

```typescript
autoUncheckParentNode(
  keyToChildKeysMap: KeyToChildKeysMap,
  unCheckedKey: NodeKey,
  checkedState: Set<NodeKey>
): Set<NodeKey>
```

## Types

```typescript
// Unique identifier for a node
type NodeKey = string | number;

// Map relating each node key to its child keys
type KeyToChildKeysMap = Record<NodeKey, NodeKey[]>;

// Node with a checkable state
interface CheckableNode {
  key: NodeKey;
  checked: boolean;
}

// Collection of checked node keys
type CheckedState = Set<NodeKey> | NodeKey[];

// Generic tree node structure
type TreeNode<T extends object, ChildrenKey extends string> = T &
  Record<ChildrenKey, TreeNode<T, ChildrenKey>[]>;
```

## Examples

### Creating a tree from flat data

```typescript
import { makeRowsTree } from "@domeadev/tree-helpers";

const rows = [
  { id: 1, name: "Parent", parentId: null },
  { id: 2, name: "Child 1", parentId: 1 },
  { id: 3, name: "Child 2", parentId: 1 },
  { id: 4, name: "Grandchild", parentId: 2 },
];

const tree = makeRowsTree({
  rows,
  getKey: (row) => row.id,
  getChildren: (row) => rows.filter((child) => child.parentId === row.id),
  rootKeys: [1],
  childrenKey: "children",
});

// Result:
// [
//   {
//     id: 1,
//     name: 'Parent',
//     parentId: null,
//     children: [
//       {
//         id: 2,
//         name: 'Child 1',
//         parentId: 1,
//         children: [
//           {
//             id: 4,
//             name: 'Grandchild',
//             parentId: 2,
//             children: []
//           }
//         ]
//       },
//       {
//         id: 3,
//         name: 'Child 2',
//         parentId: 1,
//         children: []
//       }
//     ]
//   }
// ]
```

### Managing checked states in a checkable tree

```typescript
import {
  toggleNodeCheckedState,
  makeKeyToChildKeysMap,
} from "@domeadev/tree-helpers";

const treeData = [
  {
    key: "parent",
    label: "Parent",
    children: [
      { key: "child1", label: "Child 1" },
      { key: "child2", label: "Child 2" },
    ],
  },
];

// Create a map of parent-child relationships
const keyToChildKeysMap = makeKeyToChildKeysMap(
  treeData,
  (node) => node.key,
  (node) => node.children
);

// Initial checked state
let checkedState = new Set(["child1"]);

// Toggle the 'parent' node to checked
const parentNode = { key: "parent", checked: true };
checkedState = toggleNodeCheckedState(
  keyToChildKeysMap,
  checkedState,
  parentNode
);

// Result: Set { 'child1', 'parent', 'child2' }
// When a parent is checked, all children are automatically checked
```

## License

MIT © [domeafavour](https://github.com/domeafavour/tree-helpers)
