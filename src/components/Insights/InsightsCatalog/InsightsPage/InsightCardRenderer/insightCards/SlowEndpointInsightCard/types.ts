import type { SlowEndpointInsight } from "../../../../../types";
import type { InsightCardCommonProps } from "../common/InsightCard/types";

export interface SlowEndpointInsightCardProps extends InsightCardCommonProps {
  insight: SlowEndpointInsight;
}
