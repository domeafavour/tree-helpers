import type { KeyToChildKeysMap, NodeKey } from "./typings";

export function removeNodeKey(
  keyToChildKeysMap: KeyToChildKeysMap,
  keyToRemove: NodeKey
): KeyToChildKeysMap {
  if (!(keyToRemove in keyToChildKeysMap)) {
    return keyToChildKeysMap;
  }

  const newKeyToChildKeysMap: KeyToChildKeysMap = { ...keyToChildKeysMap };

  function removeSelfAndDescendants(key: NodeKey) {
    const childKeys = newKeyToChildKeysMap[key];
    if (childKeys?.length) {
      childKeys.forEach(removeSelfAndDescendants);
    }
    delete newKeyToChildKeysMap[key];
  }

  removeSelfAndDescendants(keyToRemove);

  for (const parentKey in newKeyToChildKeysMap) {
    const siblingKeys = newKeyToChildKeysMap[parentKey];
    if (siblingKeys?.length) {
      newKeyToChildKeysMap[parentKey] = siblingKeys.filter(
        (childKey) => childKey !== keyToRemove
      );
      break;
    }
  }

  return newKeyToChildKeysMap;
}
