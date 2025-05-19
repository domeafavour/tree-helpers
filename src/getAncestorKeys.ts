import type { KeyToChildKeysMap, NodeKey } from "./typings";

/**
 * Get ancestor keys of a given key
 *
 * @see makeKeyToChildKeysMap
 * @param keyToChildKeysMap
 * @param key
 * @returns
 */
export function getAncestorKeys(
  keyToChildKeysMap: KeyToChildKeysMap,
  key: NodeKey
) {
  const ancestorKeys: NodeKey[] = [];

  function findAncestors(currentKey: NodeKey) {
    for (const parentKey in keyToChildKeysMap) {
      const childKeys = keyToChildKeysMap[parentKey];
      if (childKeys.includes(currentKey)) {
        ancestorKeys.push(parentKey);
        findAncestors(parentKey);
      }
    }
  }

  findAncestors(key);

  return ancestorKeys;
}
