import { InsightType } from "../../../types";
import { InsightProps, SpanDurationsInsight, Trace } from "../types";

export interface DurationInsightProps extends InsightProps {
  insight: SpanDurationsInsight;
  onHistogramButtonClick: (
    instrumentationLibrary: string,
    name: string,
    insightType: InsightType
  ) => void;
  onLiveButtonClick: (prefixedCodeObjectId: string) => void;
  onCompareButtonClick: (
    traces: [Trace, Trace],
    insightType: InsightType
  ) => void;
}

export interface TickData {
  value: string;
  label?: string;
  role?: string;
  multiline?: boolean;
}

export interface ChartContainerProps {
  height: number;
}
