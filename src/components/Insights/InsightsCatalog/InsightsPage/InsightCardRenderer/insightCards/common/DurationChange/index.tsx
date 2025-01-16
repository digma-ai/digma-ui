import { formatDuration, intervalToDuration } from "date-fns";
import type { Duration } from "../../../../../../../../globals";
import { formatTimeDistance } from "../../../../../../../../utils/formatTimeDistance";
import { roundTo } from "../../../../../../../../utils/roundTo";
import { ArrowIcon } from "../../../../../../../common/icons/ArrowIcon";
import { Direction } from "../../../../../../../common/icons/types";
import { Tag } from "../../../../../../../common/v3/Tag";
import type { TagType } from "../../../../../../../common/v3/Tag/types";
import * as s from "./styles";
import type { DurationChangeProps } from "./types";

const DURATION_RATIO_MIN_LIMIT = 0.1;
const DURATION_DIFF_MIN_LIMIT = 10 * 1000; // in nanoseconds

const getTagType = (direction?: Direction): TagType => {
  switch (direction) {
    case Direction.DOWN:
      return "success";
    case Direction.UP:
      return "highSeverity";
    case Direction.LEFT:
    case Direction.RIGHT:
    default:
      return "default";
  }
};

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

export const DurationChange = ({
  currentDuration,
  previousDuration,
  changeTime
}: DurationChangeProps) => {
  const isChangeMeaningful = isChangeMeaningfulEnough(
    currentDuration,
    previousDuration,
    changeTime
  );

  const direction =
    previousDuration && previousDuration.raw > currentDuration.raw
      ? Direction.DOWN
      : Direction.UP;

  return (
    <>
      {previousDuration && changeTime && isChangeMeaningful && (
        <Tag
          type={getTagType(direction)}
          title={formatTimeDistance(changeTime)}
          content={
            <s.Container>
              <s.ArrowContainer>
                <ArrowIcon
                  direction={direction}
                  color={"currentColor"}
                  size={12}
                />
              </s.ArrowContainer>
              <s.Text>
                {getDurationDifferenceString(previousDuration, currentDuration)}
              </s.Text>
            </s.Container>
          }
        />
      )}
    </>
  );
};
