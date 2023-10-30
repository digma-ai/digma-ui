import { EndpointBreakdownInsight, InsightProps } from "../types";

export interface RequestBreakdownInsightProps extends InsightProps {
  insight: EndpointBreakdownInsight;
}

export interface LegendItemDataColorProps {
  $color: string;
}

export interface FractionProgressBarValueProps {
  $value: number;
}
