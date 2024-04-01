import { InsightCardCommonProps } from "../../../../InsightsCatalog/InsightsPage/insightCards/common/InsightCard/types";
import {
  EndpointHighUsageInsight,
  EndpointLowUsageInsight,
  EndpointNormalUsageInsight
} from "../../../../types";

export interface TrafficInsightProps extends InsightCardCommonProps {
  insight:
    | EndpointLowUsageInsight
    | EndpointNormalUsageInsight
    | EndpointHighUsageInsight;
}
