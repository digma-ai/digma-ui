import { InsightType } from "../../../types";
import { SpanDurationsInsight, Trace } from "../types";

export interface DurationInsightProps {
  insight: SpanDurationsInsight;
  onRecalculate: (
    prefixedCodeObjectId: string,
    insightType: InsightType
  ) => void;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    InsightType: InsightType
  ) => void;
  onLiveButtonClick: (prefixedCodeObjectId: string) => void;
  onCompareButtonClick: (traces: [Trace, Trace]) => void;
}
