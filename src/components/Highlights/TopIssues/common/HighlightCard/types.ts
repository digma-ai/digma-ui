import type { ReactNode } from "react";
import type { GenericMetrics, HighlightData } from "../../types";

export interface HighlightCardProps {
  content: ReactNode;
  highlight: HighlightData<GenericMetrics>;
}
