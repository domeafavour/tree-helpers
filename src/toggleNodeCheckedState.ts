import { getAncestorKeys } from "./getAncestorKeys";
import type {
  CheckableNode,
  CheckedState,
  KeyToChildKeysMap,
  NodeKey,
} from "./typings";

/**
 * Toggle node checked state, and update its children and ancestors
 *
 * @see makeKeyToChildKeysMap
 * @param keyToChildKeysMap
 * @param checkedState
 * @param currentNode
 * @returns
 */
export function toggleNodeCheckedState(
  keyToChildKeysMap: KeyToChildKeysMap,
  checkedState: CheckedState,
  currentNode: CheckableNode
): Set<NodeKey> {
  const newCheckedState = new Set(checkedState);

  if (currentNode.checked) {
    newCheckedState.add(currentNode.key);
    getAncestorKeys(keyToChildKeysMap, currentNode.key).forEach(
      (ancestorKey) => {
        newCheckedState.add(ancestorKey);
      }
    );
  } else {
    newCheckedState.delete(currentNode.key);
  }

  function handleChildKeys(keys?: NodeKey[]) {
    if (!keys?.length) {
      return;
    }

    keys.forEach((key) => {
      if (currentNode.checked) {
        newCheckedState.add(key);
      } else {
        newCheckedState.delete(key);
      }
      handleChildKeys(keyToChildKeysMap[key]);
    });
  }

  handleChildKeys(keyToChildKeysMap[currentNode.key]);

  return newCheckedState;
}
