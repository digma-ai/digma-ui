import { formatDuration, intervalToDuration } from "date-fns";
import { Duration } from "../../../../../globals";
import { formatTimeDistance } from "../../../../../utils/formatTimeDistance";
import { roundTo } from "../../../../../utils/roundTo";
import { Tooltip } from "../../../../common/Tooltip";
import { ArrowIcon } from "../../../../common/icons/ArrowIcon";
import { Direction } from "../../../../common/icons/types";
import * as s from "./styles";
import { DurationChangeProps } from "./types";

const DURATION_RATIO_MIN_LIMIT = 0.1;
const DURATION_DIFF_MIN_LIMIT = 10 * 1000; // in nanoseconds

export const isChangeMeaningfulEnough = (
  currentDuration: Duration,
  previousDuration: Duration | null,
  changeTime: string | null
): boolean => {
  let isChangeMeaningfulEnough = false;

  if (previousDuration && changeTime) {
    const diff = Math.abs(currentDuration.raw - previousDuration.raw);

    isChangeMeaningfulEnough =
      diff / previousDuration.raw > DURATION_RATIO_MIN_LIMIT &&
      diff > DURATION_DIFF_MIN_LIMIT;
  }

  return isChangeMeaningfulEnough;
};

export const getDurationDifferenceString = (
  previousDuration: Duration,
  currentDuration: Duration
) => {
  const diff =
    Math.abs(previousDuration.raw - currentDuration.raw) / 1000 / 1000; // in milliseconds

  if (diff < 1000) {
    return `${roundTo(diff, 2)} ms`;
  }

  const seconds = diff / 1000;

  if (seconds < 60) {
    return `${roundTo(seconds, 2)} sec`;
  }

  const minutes = seconds / 60;

  if (minutes < 60) {
    return `${roundTo(minutes, 2)} min`;
  }

  return formatDuration(intervalToDuration({ start: 0, end: diff })); // approximate for the units larger then hours as start and end dates are unknown
};

const renderArrowIcon = (
  currentDuration: Duration,
  previousDuration: Duration | null
): JSX.Element | null => {
  if (!previousDuration) {
    return null;
  }

  const direction =
    previousDuration.raw > currentDuration.raw ? Direction.DOWN : Direction.UP;

  return (
    <s.ArrowContainer $direction={direction}>
      <ArrowIcon direction={direction} color={"currentColor"} />
    </s.ArrowContainer>
  );
};

/**
 * @deprecated
 * safe to delete after 2024-06-05
 */
export const DurationChange = ({
  currentDuration,
  previousDuration,
  changeTime,
  changeVerified
}: DurationChangeProps) => {
  const isChangeMeaningful = isChangeMeaningfulEnough(
    currentDuration,
    previousDuration,
    changeTime
  );

  return (
    <>
      {previousDuration && changeTime && isChangeMeaningful && (
        <s.Change>
          {renderArrowIcon(currentDuration, previousDuration)}
          by {getDurationDifferenceString(
            previousDuration,
            currentDuration
          )},{" "}
          <Tooltip title={new Date(changeTime).toString()}>
            <span>{formatTimeDistance(changeTime)}</span>
          </Tooltip>
        </s.Change>
      )}
      {isChangeMeaningful && changeVerified === false && (
        <Tooltip
          title={
            "This change is still being validated and is based on initial data"
          }
        >
          <span>• Evaluating</span>
        </Tooltip>
      )}
    </>
  );
};
