import { GenericMetrics, HighlightData } from "../types";

export interface HighlightCardProps {
  content: React.ReactNode;
  highlight: HighlightData<GenericMetrics>;
}
