import type { ChartOffset } from "recharts/types/util/types";

export interface OccurrenceChartProps {
  errorId: string;
  spanCodeObjectId: string;
  service: string;
}

export interface HorizontalCoordinatesGeneratorProps {
  offset: ChartOffset;
}
