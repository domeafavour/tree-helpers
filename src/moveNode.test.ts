import { describe, expect, it } from "vitest";
import { moveNode } from "./moveNode";

describe("moveNode", () => {
  it("should return same map when keyToMove does not exist", () => {
    const map = { "1": ["1.1", "1.2"], "1.1": [], "1.2": [] };
    expect(moveNode(map, "999", { newParentKey: "1" })).toBe(map);
  });

  it("should return same map when no options provided", () => {
    const map = { "1": ["1.1", "1.2"], "1.1": [], "1.2": [] };
    expect(moveNode(map, "1.1")).toBe(map);
  });

  it("should move node to a new parent", () => {
    const map = {
      "1": ["1.1", "1.2"],
      "1.1": [],
      "1.2": [],
      "2": ["2.1"],
      "2.1": [],
    };
    const result = moveNode(map, "1.1", { newParentKey: "2" });
    expect(result).toEqual({
      "1": ["1.2"],
      "1.1": [],
      "1.2": [],
      "2": ["2.1", "1.1"],
      "2.1": [],
    });
  });

  it("should move node to a new parent at specific index", () => {
    const map = {
      "1": ["1.1", "1.2"],
      "1.1": [],
      "1.2": [],
      "2": ["2.1", "2.2"],
      "2.1": [],
      "2.2": [],
    };
    const result = moveNode(map, "1.1", { newParentKey: "2", index: 0 });
    expect(result).toEqual({
      "1": ["1.2"],
      "1.1": [],
      "1.2": [],
      "2": ["1.1", "2.1", "2.2"],
      "2.1": [],
      "2.2": [],
    });
  });

  it("should reorder node within same parent", () => {
    const map = {
      "1": ["1.1", "1.2", "1.3"],
      "1.1": [],
      "1.2": [],
      "1.3": [],
    };
    const result = moveNode(map, "1.1", { index: 2 });
    expect(result).toEqual({
      "1": ["1.2", "1.3", "1.1"],
      "1.1": [],
      "1.2": [],
      "1.3": [],
    });
  });

  it("should move root node to become child of another node", () => {
    const map = {
      "1": ["1.1"],
      "1.1": [],
      "2": ["2.1"],
      "2.1": [],
    };
    const result = moveNode(map, "1", { newParentKey: "2" });
    expect(result).toEqual({
      "1": ["1.1"],
      "1.1": [],
      "2": ["2.1", "1"],
      "2.1": [],
    });
  });

  it("should throw when moving node to itself", () => {
    const map = { "1": ["1.1"], "1.1": [] };
    expect(() => moveNode(map, "1", { newParentKey: "1" })).toThrow(
      "Cannot move a node to itself"
    );
  });

  it("should throw when creating a cycle (moving to descendant)", () => {
    const map = {
      "1": ["1.1"],
      "1.1": ["1.1.1"],
      "1.1.1": [],
    };
    expect(() => moveNode(map, "1", { newParentKey: "1.1.1" })).toThrow(
      'Cannot move node "1" under its own descendant "1.1.1"'
    );
  });

  it("should throw when moving to direct child (cycle)", () => {
    const map = {
      "1": ["1.1"],
      "1.1": [],
    };
    expect(() => moveNode(map, "1", { newParentKey: "1.1" })).toThrow(
      'Cannot move node "1" under its own descendant "1.1"'
    );
  });

  it("should return same map when reordering root node with no parent", () => {
    const map = { "1": ["1.1"], "1.1": [] };
    expect(moveNode(map, "1", { index: 0 })).toBe(map);
  });
});
