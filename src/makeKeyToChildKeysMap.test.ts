import { describe, expect, it } from "vitest";
import { makeKeyToChildKeysMap } from "./makeKeyToChildKeysMap";

describe("makeKeyToChildKeysMap.test", () => {
  it("should work with tree data", () => {
    expect(
      makeKeyToChildKeysMap(
        [
          { id: "1", children: [] },
          {
            id: "2",
            children: [
              { id: "2-1", children: [] },
              {
                id: "2-2",
                children: [
                  {
                    id: "2-2-1",
                    children: [
                      { id: "2-2-1-1", children: [] },
                      { id: "2-2-1-2", children: [] },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        (n) => n.id,
        (n) => n.children
      )
    ).toEqual({
      "1": [],
      "2": ["2-1", "2-2"],
      "2-1": [],
      "2-2": ["2-2-1"],
      "2-2-1": ["2-2-1-1", "2-2-1-2"],
      "2-2-1-1": [],
      "2-2-1-2": [],
    });
  });

  it("should work with rows with parent_id", () => {
    const rows = [
      { id: "1", parent_id: null },
      { id: "2", parent_id: null },
      { id: "1-1", parent_id: "1" },
      { id: "1-2", parent_id: "1" },
      { id: "1-1-1", parent_id: "1-1" },
    ];
    expect(
      makeKeyToChildKeysMap(
        rows,
        (n) => n.id,
        (n) => rows.filter((r) => r.parent_id === n.id)
      )
    ).toEqual({
      "1": ["1-1", "1-2"],
      "2": [],
      "1-1": ["1-1-1"],
      "1-2": [],
      "1-1-1": [],
    });
  });
});
