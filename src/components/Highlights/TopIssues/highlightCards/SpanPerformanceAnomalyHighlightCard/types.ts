import type {
  HighlightData,
  SpanPerformanceAnomalyMetrics
} from "../../../../../redux/services/types";

export interface SpanPerformanceAnomalyHighlightCardProps {
  data: HighlightData<SpanPerformanceAnomalyMetrics>;
}
