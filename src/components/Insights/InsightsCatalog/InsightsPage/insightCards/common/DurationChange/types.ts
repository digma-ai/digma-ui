import { Duration } from "../../../../../../../globals";

export interface DurationChangeProps {
  currentDuration: Duration;
  previousDuration: Duration | null;
  changeTime: string | null;
}
