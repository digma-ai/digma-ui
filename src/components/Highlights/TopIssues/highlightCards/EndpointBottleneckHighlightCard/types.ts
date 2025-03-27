import type {
  EndpointBottleneckMetrics,
  HighlightData
} from "../../../../../redux/services/types";

export interface EndpointBottleneckHighlightCardProps {
  data: HighlightData<EndpointBottleneckMetrics>;
}
