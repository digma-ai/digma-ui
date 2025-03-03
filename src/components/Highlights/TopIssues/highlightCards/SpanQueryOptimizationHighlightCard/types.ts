import type {
  HighlightData,
  SpanQueryOptimizationMetrics
} from "../../../../../redux/services/types";

export interface SpanQueryOptimizationHighlightCardProps {
  data: HighlightData<SpanQueryOptimizationMetrics>;
}
