export function makeTree<R extends object, T>(
  rows: R[],
  getChildren: (row: R) => R[] | undefined,
  transformNode: (row: R, childNodes: T[], children?: R[]) => T | null
) {
  const nodes: T[] = [];

  for (const row of rows) {
    const children = getChildren(row);
    const childNodes = makeTree(children ?? [], getChildren, transformNode);
    const node = transformNode(row, childNodes, children);
    if (node) {
      nodes.push(node);
    }
  }

  return nodes;
}
