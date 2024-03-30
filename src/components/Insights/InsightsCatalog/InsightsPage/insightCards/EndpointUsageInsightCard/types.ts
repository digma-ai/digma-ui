import {
  EndpointHighUsageInsight,
  EndpointLowUsageInsight,
  EndpointNormalUsageInsight
} from "../../../../types";
import { InsightCardCommonProps } from "../common/InsightCard/types";

export interface EndpointUsageInsightCardProps extends InsightCardCommonProps {
  insight:
    | EndpointLowUsageInsight
    | EndpointNormalUsageInsight
    | EndpointHighUsageInsight;
}
