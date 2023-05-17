import { Duration } from "../../../globals";
import { SpanDurationsInsight } from "../../../types";

export interface LiveViewProps {
  data: LiveData;
  onClose: (codeObjectId: string) => void;
}

export interface LiveData {
  liveDataRecords: { duration: Duration; dateTime: string }[];
  durationInsight: SpanDurationsInsight;
}

export interface PercentileInfo {
  value: number;
  label: string;
  percentile: number;
}

export interface LiveDataEntry {
  dateTime: string;
  duration: Duration;
  percentiles: PercentileInfo[];
}
