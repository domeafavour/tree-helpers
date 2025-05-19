import { describe, expect, it } from "vitest";
import { makeNodesMap } from "./makeNodesMap";

describe("makeNodesMap.test", () => {
  it("should work", () => {
    expect(
      makeNodesMap(
        [
          {
            id: "1",
            children: [
              {
                id: "1.1",
                children: [
                  { id: "1.1.1", children: [] },
                  { id: "1.1.2", children: [] },
                ],
              },
              {
                id: "1.2",
                children: [],
              },
            ],
          },
          {
            id: "2",
            children: [
              {
                id: "2.1",
                children: [],
              },
            ],
          },
        ],
        (node) => node.id,
        (node) => node.children
      )
    ).toMatchObject(
      new Map([
        ["1", { id: "1" }],
        ["1.1", { id: "1.1" }],
        ["1.1.1", { id: "1.1.1" }],
        ["1.1.2", { id: "1.1.2" }],
        ["1.2", { id: "1.2" }],
        ["2", { id: "2" }],
        ["2.1", { id: "2.1" }],
      ])
    );
  });
});
