import { describe, expect, it } from "vitest";
import { removeNodeKey } from "./removeNodeKey";

describe("removeNodeKey.test", () => {
  it("should return `keyToChildKeysMap` itself when `keyToRemove` not exist", () => {
    const keyToChildKeysMap = { "2": ["2.1"] };
    expect(removeNodeKey(keyToChildKeysMap, "1")).toBe(keyToChildKeysMap);
  });

  it("should remove `keyToRemove` and its related keys", () => {
    const keyToChildKeysMap = {
      "1": ["1.1", "1.2"],
      "1.1": ["1.1.1", "1.1.2"],
      "1.1.1": ["1.1.1.1"],
      "1.1.1.1": ["1.1.1.1.1"],
      "1.2": ["1.2.1", "1.2.2"],
      "2": [],
    };
    expect(removeNodeKey(keyToChildKeysMap, "1.1")).toEqual({
      "1": ["1.2"],
      "1.2": ["1.2.1", "1.2.2"],
      "2": [],
    });
  });
});
