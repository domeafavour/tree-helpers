import { describe, expect, it } from "vitest";
import { getAncestorKeys } from "./getAncestorKeys";

describe("getAncestorKeys.test", () => {
  it("should work", () => {
    expect(
      getAncestorKeys(
        {
          "1": [],
          "2": ["2-1", "2-2"],
          "2-1": [],
          "2-2": ["2-2-1"],
        },
        "2-2-1"
      )
    ).toEqual(["2-2", "2"]);
  });
});
