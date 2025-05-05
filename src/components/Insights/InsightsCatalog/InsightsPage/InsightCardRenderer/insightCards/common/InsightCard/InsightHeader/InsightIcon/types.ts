import type { InsightTypeInfo } from "../../../../../../../../../../utils/getInsightTypeInfo";

export interface InsightIconProps {
  insightTypeInfo: InsightTypeInfo;
  severity?: number;
  impact?: number;
  criticality: number;
}

export type ValueLabel = "Low" | "Medium" | "High";
