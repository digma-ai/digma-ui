import type { SlowEndpointInsight } from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface SlowEndpointInsightCardProps extends InsightCardCommonProps {
  insight: SlowEndpointInsight;
}
