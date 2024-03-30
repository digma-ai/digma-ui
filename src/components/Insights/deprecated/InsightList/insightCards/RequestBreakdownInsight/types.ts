import { InsightCardCommonProps } from "../../../../InsightsCatalog/InsightsPage/insightCards/common/InsightCard/types";
import { EndpointBreakdownInsight } from "../../../../types";

export interface RequestBreakdownInsightProps extends InsightCardCommonProps {
  insight: EndpointBreakdownInsight;
}

export interface LegendItemDataColorProps {
  $color: string;
}

export interface FractionProgressBarValueProps {
  $value: number;
}
