import { InsightType, SpanDurationsInsight, Trace } from "../../../../types";
import { InsightCardCommonProps } from "../common/InsightCard/types";

export interface SpanDurationsInsightCardProps extends InsightCardCommonProps {
  insight: SpanDurationsInsight;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    insightType: InsightType,
    displayName: string
  ) => void;
  onLiveButtonClick: (codeObjectId: string) => void;
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
