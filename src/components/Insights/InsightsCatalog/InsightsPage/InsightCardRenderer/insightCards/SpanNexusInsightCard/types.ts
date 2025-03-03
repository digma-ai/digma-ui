import type { SpanNexusInsight } from "../../../../../types";
import type { InsightCardCommonProps } from "../types";

export interface SpanNexusInsightCardProps extends InsightCardCommonProps {
  insight: SpanNexusInsight;
}
