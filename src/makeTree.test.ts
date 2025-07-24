import { describe, expect, it } from "vitest";

import { makeTree } from "./makeTree";

interface Row {
  id: number;
  parentId: number | null;
}

interface TreeNode {
  id: number;
  children: TreeNode[];
}

describe("makeRowsTree", () => {
  const rows: Row[] = [
    { id: 1, parentId: null },
    { id: 2, parentId: 1 },
    { id: 3, parentId: 1 },
    { id: 4, parentId: 2 },
    { id: 5, parentId: 2 },
  ];

  const getChildren = (row: Row) => rows.filter((r) => r.parentId === row.id);

  const transformNode = (row: Row, childNodes: TreeNode[]): TreeNode => ({
    id: row.id,
    children: childNodes,
  });

  it("should create a tree structure from rows", () => {
    const tree = makeTree(
      rows.filter((r) => r.parentId === null),
      getChildren,
      transformNode
    );
    expect(tree).toEqual([
      {
        id: 1,
        children: [
          {
            id: 2,
            children: [
              { id: 4, children: [] },
              { id: 5, children: [] },
            ],
          },
          {
            id: 3,
            children: [],
          },
        ],
      },
    ]);
  });

  it("should return an empty array if no rows are provided", () => {
    const tree = makeTree([], getChildren, transformNode);
    expect(tree).toEqual([]);
  });

  it("should handle rows with no children", () => {
    const singleRow: Row[] = [{ id: 1, parentId: null }];
    const tree = makeTree(
      singleRow,
      (row) => singleRow.filter((r) => r.parentId === row.id),
      transformNode
    );
    expect(tree).toEqual([{ id: 1, children: [] }]);
  });

  it("should handle rows with multiple levels of children", () => {
    const multiLevelRows: Row[] = [
      { id: 1, parentId: null },
      { id: 2, parentId: 1 },
      { id: 3, parentId: 2 },
      { id: 4, parentId: 3 },
    ];
    const tree = makeTree(
      // filter root rows
      multiLevelRows.filter((r) => r.parentId === null),
      (row) => multiLevelRows.filter((r) => r.parentId === row.id),
      transformNode
    );
    expect(tree).toEqual([
      {
        id: 1,
        children: [
          {
            id: 2,
            children: [
              {
                id: 3,
                children: [{ id: 4, children: [] }],
              },
            ],
          },
        ],
      },
    ]);
  });

  it("should ignore the null node returned by `transformNode`", () => {
    const rows: Row[] = [
      { id: 1, parentId: null },
      { id: 2, parentId: 1 },
      { id: 3, parentId: 2 },
      { id: 4, parentId: 3 },
    ];
    const rootRows = rows.filter((r) => r.parentId === null);
    const actual = makeTree<Row, TreeNode>(
      rootRows,
      (row) => rows.filter((r) => r.parentId === row.id),
      (row, childNodes) =>
        row.id === 2 ? null : { id: row.id, children: childNodes }
    );
    expect(actual).toEqual([
      {
        id: 1,
        children: [],
      },
    ]);
  });
});
