import type {
  GenericMetrics,
  HighlightData
} from "../../../../redux/services/types";

export interface HighlightCardRendererProps {
  highlight: HighlightData<GenericMetrics>;
}
