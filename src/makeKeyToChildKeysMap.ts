import type { KeyToChildKeysMap, NodeKey } from "./typings";
import { walkNodes } from "./walkNodes";

/**
 * Make a map of key to child keys
 *
 * @param tree
 * @param getKey
 * @param getChildren
 * @returns
 */
export function makeKeyToChildKeysMap<T>(
  tree: T[],
  getKey: (n: T) => NodeKey,
  getChildren: (n: T) => T[] | undefined
) {
  const keyToChildKeysMap: KeyToChildKeysMap = {};

  walkNodes(tree, getChildren, (node, children) => {
    if (children) {
      keyToChildKeysMap[getKey(node)] = children.map(getKey);
    }
  });

  return keyToChildKeysMap;
}
