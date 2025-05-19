import type { KeyToChildKeysMap, NodeKey, TreeNode } from "./typings";
import { walkNodes } from "./walkNodes";

export function makeRowsTree<T extends object, ChildrenKey extends string>({
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
}) {
  type _TreeNode = TreeNode<T, ChildrenKey>;
  const nodesMap = new Map<NodeKey, _TreeNode>();
  const keyToChildKeysMap: KeyToChildKeysMap = {};
  walkNodes(rows, getChildren, (row, children) => {
    const rowKey = getKey(row);
    // makeNodesMap
    nodesMap.set(rowKey, { ...row, [childrenKey]: [] } as _TreeNode);

    // makeKeyToChildKeysMap
    if (children) {
      keyToChildKeysMap[rowKey] = children.map(getKey);
    }
  });

  const tree: _TreeNode[] = [];

  nodesMap.forEach((node, nodeKey) => {
    if (rootKeys.includes(nodeKey)) {
      tree.push(node);
    }

    const childKeys = keyToChildKeysMap[nodeKey];
    if (childKeys.length) {
      childKeys.forEach((childKey) => {
        node[childrenKey].push(nodesMap.get(childKey)!);
      });
    }
  });

  return [tree, nodesMap] as const;
}
