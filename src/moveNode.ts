import type { KeyToChildKeysMap, NodeKey } from "./typings";

function isDescendant(
  keyToChildKeysMap: KeyToChildKeysMap,
  ancestorKey: NodeKey,
  candidateKey: NodeKey
): boolean {
  const childKeys = keyToChildKeysMap[ancestorKey];
  if (!childKeys?.length) {
    return false;
  }
  if (childKeys.includes(candidateKey)) {
    return true;
  }
  return childKeys.some((childKey) =>
    isDescendant(keyToChildKeysMap, childKey, candidateKey)
  );
}

function findParent(
  keyToChildKeysMap: KeyToChildKeysMap,
  key: NodeKey
): NodeKey | undefined {
  for (const parentKey in keyToChildKeysMap) {
    if (keyToChildKeysMap[parentKey].includes(key)) {
      return parentKey;
    }
  }
  return undefined;
}

/**
 * Move a node within the tree by updating the keyToChildKeysMap
 *
 * - Move to a new parent (and optionally at a specific index)
 * - Reorder within the current parent
 *
 * @see makeKeyToChildKeysMap
 * @param keyToChildKeysMap
 * @param keyToMove - the key of the node to move
 * @param options - optional: newParentKey and/or index
 * @returns a new KeyToChildKeysMap
 * @throws if newParentKey is a descendant of keyToMove (cycle detection)
 */
export function moveNode(
  keyToChildKeysMap: KeyToChildKeysMap,
  keyToMove: NodeKey,
  options?: { newParentKey?: NodeKey; index?: number }
): KeyToChildKeysMap {
  if (!(keyToMove in keyToChildKeysMap)) {
    return keyToChildKeysMap;
  }

  if (!options || (options.newParentKey === undefined && options.index === undefined)) {
    return keyToChildKeysMap;
  }

  const { newParentKey, index } = options;
  const currentParent = findParent(keyToChildKeysMap, keyToMove);

  if (newParentKey !== undefined) {
    if (newParentKey === keyToMove) {
      throw new Error("Cannot move a node to itself");
    }
    if (isDescendant(keyToChildKeysMap, keyToMove, newParentKey)) {
      throw new Error(
        `Cannot move node "${keyToMove}" under its own descendant "${newParentKey}"`
      );
    }
  }

  const newKeyToChildKeysMap: KeyToChildKeysMap = {};

  for (const key in keyToChildKeysMap) {
    const childKeys = keyToChildKeysMap[key];

    if (key === currentParent) {
      newKeyToChildKeysMap[key] = childKeys.filter((k) => k !== keyToMove);
    } else {
      newKeyToChildKeysMap[key] = [...childKeys];
    }
  }

  const targetParentKey = newParentKey ?? currentParent;

  if (targetParentKey === undefined) {
    return keyToChildKeysMap;
  }

  if (targetParentKey in newKeyToChildKeysMap) {
    const siblings = newKeyToChildKeysMap[targetParentKey];
    const insertIndex = index ?? siblings.length;
    newKeyToChildKeysMap[targetParentKey] = [
      ...siblings.slice(0, insertIndex),
      keyToMove,
      ...siblings.slice(insertIndex),
    ];
  }

  return newKeyToChildKeysMap;
}
