import type { ReactNode } from "react";
import type {
  GenericMetrics,
  HighlightData
} from "../../../../../redux/services/types";

export interface HighlightCardProps {
  content: ReactNode;
  highlight: HighlightData<GenericMetrics>;
}
