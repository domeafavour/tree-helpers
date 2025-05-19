import { describe, expect, it } from "vitest";
import { flattenNodes } from "./flattenNodes";

describe("flattenNodes.test", () => {
  it("should work", () => {
    expect(
      flattenNodes(
        [
          {
            id: "1",
            children: [
              {
                id: "1.1",
                children: [{ id: "1.1.1", children: [] }],
              },
            ],
          },
        ],
        (n) => n.children
      )
    ).toMatchObject(new Set([{ id: "1" }, { id: "1.1" }, { id: "1.1.1" }]));
  });
});
