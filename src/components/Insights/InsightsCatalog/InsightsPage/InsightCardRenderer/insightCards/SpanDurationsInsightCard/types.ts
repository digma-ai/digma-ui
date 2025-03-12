import type { InsightType } from "../../../../../../../types";
import type { SpanDurationsInsight } from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface SpanDurationsInsightCardProps extends InsightCardCommonProps {
  insight: SpanDurationsInsight;
  onHistogramButtonClick: (
    spanCodeObjectId: string,
    insightType: InsightType,
    displayName: string,
    environmentId: string
  ) => void;
  onLiveButtonClick: (codeObjectId: string) => void;
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
