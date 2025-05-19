import { describe, expect, it } from "vitest";
import { autoUncheckParentNode } from "./autoUncheckParentNode";

describe("autoUncheckParentNode.test", () => {
  it("should uncheck parent node when all ths child nodes are unchecked", () => {
    const checkedState = new Set<string>(["1", "2", "3", "1.2"]);
    expect(
      autoUncheckParentNode(
        {
          "1": ["1.1", "1.2"],
          "2": [],
          "3": [],
        },
        "1.2",
        checkedState
      )
    ).toEqual(new Set<string>(["2", "3"]));
  });

  it("should uncheck parent node recursively when all ths child nodes are unchecked", () => {
    const checkedState = new Set<string>(["1b2e84bbfbad72473400046eea556f9d"]);
    expect(
      autoUncheckParentNode(
        {
          "05fd26ca4b56fae896252dba8f2aa682": [],
          "1b2e84bbfbad72473400046eea556f9d": [
            "560423c230b8673ae650429fdfab0c1d",
            "6c287254252ab5cdda8649b3f4e4b4e6",
            "98ca5a89e08759e5ff07dae4173eb634",
            "b91d5f9553b8220a96502603c8d1ac22",
          ],
          "560423c230b8673ae650429fdfab0c1d": [],
          "6c287254252ab5cdda8649b3f4e4b4e6": [],
          "98ca5a89e08759e5ff07dae4173eb634": [],
          b91d5f9553b8220a96502603c8d1ac22: [],
          "2ba840f88e552ed1e9c27161a660c842": [],
          d09e06f5393da6b92da3707664c1e897: [
            "05eb42f3f78c896588bdee40600c57cb",
          ],
          "05eb42f3f78c896588bdee40600c57cb": [],
          ddbf6a924d51c70556068dd29bdd8a99: [],
        },
        "560423c230b8673ae650429fdfab0c1d",
        checkedState
      )
    ).toEqual(new Set<string>([]));
  });
});
