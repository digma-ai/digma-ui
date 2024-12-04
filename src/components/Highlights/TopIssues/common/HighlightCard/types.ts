import { ReactNode } from "react";
import { GenericMetrics, HighlightData } from "../../types";

export interface HighlightCardProps {
  content: ReactNode;
  highlight: HighlightData<GenericMetrics>;
}
