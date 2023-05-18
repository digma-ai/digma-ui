import { Duration } from "../../../globals";
import { SpanDurationsInsight } from "../../../types";

export interface LiveViewProps {
  data: LiveData;
  onClose: (codeObjectId: string) => void;
}

interface LiveDataRecord {
  dateTime: string;
  duration: Duration;
}

export interface LiveData {
  liveDataRecords: LiveDataRecord[];
  durationInsight: SpanDurationsInsight;
}

export interface PercentileInfo {
  value: number;
  label: string;
  percentile: number;
}

export interface ExtendedLiveDataRecord extends LiveDataRecord {
  percentiles: PercentileInfo[];
}
