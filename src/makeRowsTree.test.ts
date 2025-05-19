import { describe, expect, it } from "vitest";
import { makeRowsTree } from "./makeRowsTree";

describe("makeRowsTree.test", () => {
  it("should work", () => {
    const rows = [
      { id: "1", parentId: null },
      { id: "1.1", parentId: "1" },
      { id: "1.1.1", parentId: "1.1" },
      { id: "1.2", parentId: "1" },
      { id: "2", parentId: null },
    ];

    const rootKeys = rows.filter((r) => r.parentId === null).map((r) => r.id);

    const [tree] = makeRowsTree({
      rows,
      getKey: (n) => n.id,
      getChildren: (n) => rows.filter((r) => r.parentId === n.id),
      rootKeys,
      childrenKey: "children",
    });

    expect(tree).toEqual([
      {
        id: "1",
        parentId: null,
        children: [
          {
            id: "1.1",
            parentId: "1",
            children: [
              {
                id: "1.1.1",
                parentId: "1.1",
                children: [],
              },
            ],
          },
          {
            id: "1.2",
            parentId: "1",
            children: [],
          },
        ],
      },
      {
        id: "2",
        parentId: null,
        children: [],
      },
    ]);
  });

  it("each tree node should be a new object (not a reference to the original node)", () => {
    const rows = [{ id: "1", parentId: null }];
    const rootKeys = ["1"];

    const [tree] = makeRowsTree({
      rows,
      getKey: (n) => n.id,
      getChildren: (n) => rows.filter((r) => r.parentId === n.id),
      rootKeys,
      childrenKey: "children",
    });

    expect(tree[0]).not.toBe(rows[0]);
    expect(tree[0]).toMatchObject({
      id: "1",
      parentId: null,
    });
  });
});
