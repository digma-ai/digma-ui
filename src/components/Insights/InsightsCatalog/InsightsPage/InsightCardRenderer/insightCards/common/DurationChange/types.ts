import type { Duration } from "../../../../../../../../redux/services/types";

export interface DurationChangeProps {
  currentDuration: Duration;
  previousDuration: Duration | null;
  changeTime: string | null;
}
