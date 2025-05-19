import type { ChartOffset } from "recharts/types/util/types";

export interface OccurrenceChartProps {
  errorId: string;
  spanCodeObjectId: string;
  service: string;
  environmentId?: string;
}

export interface HorizontalCoordinatesGeneratorProps {
  offset: ChartOffset;
}
