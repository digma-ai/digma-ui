import type {
  EndpointHighUsageInsight,
  EndpointLowUsageInsight,
  EndpointNormalUsageInsight
} from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface EndpointUsageInsightCardProps extends InsightCardCommonProps {
  insight:
    | EndpointLowUsageInsight
    | EndpointNormalUsageInsight
    | EndpointHighUsageInsight;
}
