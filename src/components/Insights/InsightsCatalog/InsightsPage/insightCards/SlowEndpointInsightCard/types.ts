import { SlowEndpointInsight } from "../../../../types";
import { InsightCardCommonProps } from "../common/InsightCard/types";

export interface SlowEndpointInsightCardProps extends InsightCardCommonProps {
  insight: SlowEndpointInsight;
}
