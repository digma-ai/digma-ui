import type { InsightType } from "../../../../../types";

export type ContentAlignment = "left" | "center" | "right";

export interface IncidentRelatedIssue {
  type: InsightType;
  spanUid: string;
  criticality: number;
}

export interface TableCellContentProps {
  $align?: ContentAlignment;
}
