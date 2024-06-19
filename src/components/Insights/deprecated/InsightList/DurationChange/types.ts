import { Duration } from "../../../../../globals";
import { Direction } from "../../../../common/icons/types";

export interface DurationChangeProps {
  currentDuration: Duration;
  previousDuration: Duration | null;
  changeTime: string | null;
  changeVerified: boolean | null;
}

export interface ArrowContainerProps {
  $direction: Direction;
}
