import { EndpointBreakdownInsight, InsightProps } from "../../../types";

export interface RequestBreakdownInsightProps extends InsightProps {
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
