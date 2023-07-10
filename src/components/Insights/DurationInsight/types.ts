import { InsightType } from "../../../types";
import { InsightProps, SpanDurationsInsight, Trace } from "../types";

export interface DurationInsightProps extends InsightProps {
  insight: SpanDurationsInsight;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    InsightType: InsightType
  ) => void;
  onLiveButtonClick: (prefixedCodeObjectId: string) => void;
  onCompareButtonClick: (traces: [Trace, Trace]) => void;
}
