import { ChartOffset } from "recharts/types/util/types";
import { Duration } from "../../../globals";

export interface LiveViewProps {
  data: LiveData;
  onClose: (codeObjectId: string) => void;
}

interface LiveDataRecord {
  dateTime: string;
  duration: Duration;
  isError?: boolean;
}

export interface LiveDataDurationPercentile {
  percentile: number;
  currentDuration: Duration;
  previousDuration: Duration | null;
  changeVerified: boolean | null;
}

interface LiveDataDuration {
  percentiles: LiveDataDurationPercentile[];
  codeObjectId: string;
  displayName: string;
}

export interface LiveData {
  liveDataRecords: LiveDataRecord[];
  durationData: LiveDataDuration;
}

export interface PercentileInfo {
  duration: Duration;
  label: string;
  percentile: number;
}

export interface ExtendedLiveDataRecord extends LiveDataRecord {
  dateTimeValue: number;
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface ContainerProps {
  $isChangeStatusBarPresent: boolean;
}

export type ChartsContainerProps = ContainerProps;

export interface DotTooltipProps {
  coordinates: Coordinates;
  data: ExtendedLiveDataRecord;
}

export interface AxisChartContainerProps {
  $scrollbarOffset: number;
  $width: number;
}

export interface AreaLegendIllustrationProps {
  $color: string;
}

export interface DotProps {
  payload: ExtendedLiveDataRecord;
}

export interface VerticalCoordinatesGeneratorProps {
  width: number | undefined;
  offset: ChartOffset;
}
