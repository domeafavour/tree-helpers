import type { KeyToChildKeysMap, NodeKey } from "./typings";

/**
 * Uncheck the parent node when all the child nodes are unchecked
 *
 * @param keyToChildKeysMap
 * @param unCheckedKey
 * @param checkedState
 * @returns
 */
export function autoUncheckParentNode(
  keyToChildKeysMap: KeyToChildKeysMap,
  unCheckedKey: NodeKey,
  checkedState: Set<NodeKey>
): Set<NodeKey> {
  const newCheckedState = new Set(checkedState);

  const keys = Object.keys(keyToChildKeysMap);

  function unCheck(nodeKey: NodeKey) {
    newCheckedState.delete(nodeKey);

    for (const key of keys) {
      const childKeys = keyToChildKeysMap[key];
      if (childKeys?.includes(nodeKey)) {
        if (childKeys.every((childKey) => !newCheckedState.has(childKey))) {
          newCheckedState.delete(key);
          unCheck(key);
        }
      }
    }
  }

  unCheck(unCheckedKey);

  return newCheckedState;
}
