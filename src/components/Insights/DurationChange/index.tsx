import { formatDuration, intervalToDuration } from "date-fns";
import { DefaultTheme, useTheme } from "styled-components";
import { Duration } from "../../../globals";
import { formatTimeDistance } from "../../../utils/formatTimeDistance";
import { roundTo } from "../../../utils/roundTo";
import { ArrowIcon } from "../../common/icons/ArrowIcon";
import { Direction } from "../../common/icons/types";
import * as s from "./styles";
import { DurationChangeProps } from "./types";

const DURATION_RATIO_MIN_LIMIT = 0.1;
const DURATION_DIFF_MIN_LIMIT = 10 * 1000; // in nanoseconds

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

const getArrowIconColor = (direction: Direction, theme: DefaultTheme) => {
  if (direction === Direction.UP) {
    switch (theme.mode) {
      case "light":
        return "#e00036";
      case "dark":
      case "dark-jetbrains":
        return "#f93967";
    }
  }

  switch (theme.mode) {
    case "light":
      return "#1dc693";
    case "dark":
    case "dark-jetbrains":
      return "#67d28b";
  }
};

const renderArrowIcon = (
  currentDuration: Duration,
  previousDuration: Duration | null,
  theme: DefaultTheme
): JSX.Element | null => {
  if (!previousDuration) {
    return null;
  }

  const direction =
    previousDuration.raw > currentDuration.raw ? Direction.DOWN : Direction.UP;

  return (
    <ArrowIcon
      direction={direction}
      color={getArrowIconColor(direction, theme)}
      size={10}
    />
  );
};

export const DurationChange = (props: DurationChangeProps) => {
  const theme = useTheme();

  let changeMeaningfulEnough = false;

  if (props.previousDuration && props.changeTime) {
    const diff = Math.abs(
      props.currentDuration.raw - props.previousDuration.raw
    );

    changeMeaningfulEnough =
      diff / props.previousDuration.raw > DURATION_RATIO_MIN_LIMIT &&
      diff > DURATION_DIFF_MIN_LIMIT;
  }

  return (
    <>
      {props.previousDuration && props.changeTime && changeMeaningfulEnough && (
        <s.Change>
          {renderArrowIcon(
            props.currentDuration,
            props.previousDuration,
            theme
          )}
          {getDurationDifferenceString(
            props.previousDuration,
            props.currentDuration
          )}
          , {formatTimeDistance(props.changeTime)}
        </s.Change>
      )}
      {props.changeTime &&
        changeMeaningfulEnough &&
        props.changeVerified === false && (
          <span
            title={
              "This change is still being validated and is based on initial data"
            }
          >
            Evaluating
          </span>
        )}
    </>
  );
};
