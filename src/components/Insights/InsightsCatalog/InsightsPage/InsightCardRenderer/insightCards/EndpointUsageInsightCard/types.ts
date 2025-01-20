import type {
  EndpointHighUsageInsight,
  EndpointLowUsageInsight,
  EndpointNormalUsageInsight
} from "../../../../../types";
import type { InsightCardCommonProps } from "../common/InsightCard/types";

export interface EndpointUsageInsightCardProps extends InsightCardCommonProps {
  insight:
    | EndpointLowUsageInsight
    | EndpointNormalUsageInsight
    | EndpointHighUsageInsight;
}
