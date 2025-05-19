export type NodeKey = string | number;

export type KeyToChildKeysMap = Record<NodeKey, NodeKey[]>;

export interface CheckableNode {
  key: NodeKey;
  checked: boolean;
}

export type CheckedState = Set<NodeKey> | NodeKey[];

export type TreeNode<T extends object, ChildrenKey extends string> = T &
  Record<ChildrenKey, TreeNode<T, ChildrenKey>[]>;
