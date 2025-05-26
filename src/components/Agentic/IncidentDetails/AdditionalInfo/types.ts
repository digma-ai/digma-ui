export type TabId = "relatedIssues" | "artifacts";

export interface TabProps {
  $isDisabled?: boolean;
  $isActive?: boolean;
}

export interface ColumnMeta {
  width: string | number;
  textAlign?: "left" | "center" | "right";
}
