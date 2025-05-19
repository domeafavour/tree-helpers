import { walkNodes } from "./walkNodes";

/**
 * Flatten nodes
 *
 * @see walkNodes
 * @param notes
 * @param getChildren
 * @returns
 */
export function flattenNodes<T>(notes: T[], getChildren: (node: T) => T[]) {
  const flattenedNodes = new Set<T>();

  walkNodes(notes, getChildren, (node) => {
    flattenedNodes.add(node);
  });

  return flattenedNodes;
}
