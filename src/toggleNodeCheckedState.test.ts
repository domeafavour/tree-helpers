import { describe, expect, it } from "vitest";
import { toggleNodeCheckedState } from "./toggleNodeCheckedState";

const childKeysMap = {
  "1": ["1.1", "1.2"],
  "1.1": ["1.1.1", "1.1.2"],
  "1.1.1": [],
  "1.1.2": [],
  "2": ["2.1"],
};

describe("toggleCheckNode.test", () => {
  it("should check ancestors and children when target node checks", () => {
    expect(
      toggleNodeCheckedState(childKeysMap, [], { key: "1.1", checked: true })
    ).toEqual(new Set(["1", "1.1", "1.1.1", "1.1.2"]));
  });

  it("should not uncheck ancestors when target node unchecks", () => {
    expect(
      toggleNodeCheckedState(
        childKeysMap,
        ["1", "1.1", "1.1.1", "1.1.2", "2", "2.1"],
        {
          key: "1.1",
          checked: false,
        }
      )
    ).toEqual(new Set(["1", "2", "2.1"]));
  });
});
