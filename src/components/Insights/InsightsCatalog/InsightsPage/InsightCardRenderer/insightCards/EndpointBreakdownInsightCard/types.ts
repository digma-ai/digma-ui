import type { EndpointBreakdownInsight } from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface EndpointBreakdownInsightCardProps
  extends InsightCardCommonProps {
  insight: EndpointBreakdownInsight;
}

export interface LegendItemDataColorBadgeProps {
  $colors: {
    background: string;
    border: string;
  };
}

export interface FractionProgressBarValueProps {
  $value: number;
}
