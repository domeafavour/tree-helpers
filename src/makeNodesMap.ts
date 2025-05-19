import type { NodeKey } from "./typings";
import { walkNodes } from "./walkNodes";

/**
 * Make a map of nodes by key
 *
 * @see walkNodes
 * @param nodes
 * @param getKey
 * @param getChildren
 * @returns
 */
export function makeNodesMap<T>(
  nodes: T[],
  getKey: (node: T) => NodeKey,
  getChildren: (node: T) => T[]
) {
  const nodesMap = new Map<NodeKey, T>();

  walkNodes(nodes, getChildren, (node) => {
    nodesMap.set(getKey(node), node);
  });

  return nodesMap;
}
