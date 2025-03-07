import type {
  HighlightData,
  SpanEndpointBottleneckMetrics
} from "../../../../../redux/services/types";

export interface SpanEndpointBottleneckHighlightCardProps {
  data: HighlightData<SpanEndpointBottleneckMetrics>;
}
