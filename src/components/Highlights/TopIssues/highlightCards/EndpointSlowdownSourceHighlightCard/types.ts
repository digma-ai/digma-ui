import type {
  EndpointSlowdownSourceMetrics,
  HighlightData
} from "../../../../../redux/services/types";

export interface EndpointSlowdownSourceHighlightCardProps {
  data: HighlightData<EndpointSlowdownSourceMetrics>;
}
