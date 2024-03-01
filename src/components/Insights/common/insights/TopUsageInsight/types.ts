import {
  InsightProps,
  InsightType,
  SpanUsagesInsight,
  Trace
} from "../../../types";

export interface TopUsageInsightProps extends InsightProps {
  insight: SpanUsagesInsight;
  onAssetLinkClick: (
    spanCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onTraceButtonClick: (
    trace: Trace,
    insightType: InsightType,
    spanCodeObjectId?: string
  ) => void;
}

export interface ColumnMeta {
  width: string | number;
  minWidth?: string | number;
}
