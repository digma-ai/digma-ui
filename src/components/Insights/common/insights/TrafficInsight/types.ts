import {
  EndpointHighUsageInsight,
  EndpointLowUsageInsight,
  EndpointNormalUsageInsight,
  InsightProps
} from "../../../types";

export interface TrafficInsightProps extends InsightProps {
  insight:
    | EndpointLowUsageInsight
    | EndpointNormalUsageInsight
    | EndpointHighUsageInsight;
}
