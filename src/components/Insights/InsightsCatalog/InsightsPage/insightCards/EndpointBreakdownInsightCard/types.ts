import type { EndpointBreakdownInsight } from "../../../../types";
import type { InsightCardCommonProps } from "../common/InsightCard/types";

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
