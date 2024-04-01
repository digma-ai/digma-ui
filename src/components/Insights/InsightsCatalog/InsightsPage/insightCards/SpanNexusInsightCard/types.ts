import { SpanNexusInsight } from "../../../../types";
import { InsightCardCommonProps } from "../common/InsightCard/types";

export interface SpanNexusInsightCardProps extends InsightCardCommonProps {
  insight: SpanNexusInsight;
}
