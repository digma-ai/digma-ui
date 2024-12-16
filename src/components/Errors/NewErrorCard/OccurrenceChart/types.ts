import type { ChartOffset } from "recharts/types/util/types";

export interface OccurrenceChartProps {
  errorId: string;
  spanCodeObjectId: string;
  service: string;
}

export interface GetErrorTimeSeriesDataPayload {
  errorId: string;
  scope: {
    spanCodeObjectId: string;
    service: string;
    environment: string;
  };
}

export interface ErrorOccurrenceRecord {
  date: string;
  value: number;
}

export interface SetErrorTimeSeriesDataPayload {
  errorId: string;
  dailyOccurrence: ErrorOccurrenceRecord[];
}

export interface HorizontalCoordinatesGeneratorProps {
  offset: ChartOffset;
}
