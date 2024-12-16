import type { SpanNexusInsight } from "../../../../types";
import type { InsightCardCommonProps } from "../common/InsightCard/types";

export interface SpanNexusInsightCardProps extends InsightCardCommonProps {
  insight: SpanNexusInsight;
}
