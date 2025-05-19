export function walkNodes<T>(
  nodes: T[],
  getChildren: (node: T) => T[] | undefined,
  fn: (node: T, children: T[] | undefined) => void
) {
  nodes.forEach((node) => {
    const children = getChildren(node);
    fn(node, children);
    if (children) {
      walkNodes(children, getChildren, fn);
    }
  });
}
