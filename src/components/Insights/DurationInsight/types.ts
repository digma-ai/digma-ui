import { InsightType } from "../../../types";
import { InsightProps, SpanDurationsInsight, Trace } from "../types";

export interface DurationInsightProps extends InsightProps {
  insight: SpanDurationsInsight;
  onHistogramButtonClick: (
    instrumentationLibrary: string,
    name: string,
    insightType: InsightType,
    displayName?: string
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
  textAnchor?: "start" | "end" | "middle" | "inherit";
  multiline?: boolean;
}

export interface ChartContainerProps {
  $height: number;
}

export interface LastCallTimeDistanceProps {
  $isRecent: boolean;
}
