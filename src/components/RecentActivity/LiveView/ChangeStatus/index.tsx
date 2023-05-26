import { DefaultTheme, useTheme } from "styled-components";
import { ArrowIcon } from "../../../common/icons/ArrowIcon";
import { Direction } from "../../../common/icons/types";
import { LiveDataDurationPercentile } from "../types";
import * as s from "./styles";
import { ChangeStatusProps } from "./types";

const DURATION_RATIO_MIN_LIMIT = 0.1;
const DURATION_DIFF_MIN_LIMIT = 10 * 1000; // in nanoseconds

const getStatusString = (percentile: LiveDataDurationPercentile) => {
  if (!percentile.previousDuration) {
    return "";
  }

  const diff = percentile.previousDuration.raw - percentile.currentDuration.raw;

  if (diff > 0) {
    return "Speedup detected";
  }

  if (diff < 0) {
    return "Slowdown detected";
  }

  return "";
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
  percentile: LiveDataDurationPercentile,
  theme: DefaultTheme
): JSX.Element | null => {
  if (
    !percentile.previousDuration ||
    percentile.currentDuration.raw === percentile.previousDuration.raw ||
    !percentile.changeVerified
  ) {
    return null;
  }

  const direction =
    percentile.previousDuration.raw > percentile.currentDuration.raw
      ? Direction.DOWN
      : Direction.UP;

  return (
    <ArrowIcon
      direction={direction}
      color={getArrowIconColor(direction, theme)}
      size={16}
    />
  );
};

export const ChangeStatus = (props: ChangeStatusProps) => {
  const theme = useTheme();
  if (props.percentiles.length === 0) {
    return null;
  }

  const percentile = props.percentiles.find(
    (x) => x.previousDuration && typeof x.changeVerified === "boolean"
  );

  if (!percentile) {
    return null;
  }

  let changeMeaningfulEnough = false;

  if (percentile.previousDuration) {
    const diff = Math.abs(
      percentile.currentDuration.raw - percentile.previousDuration.raw
    );

    changeMeaningfulEnough =
      diff / percentile.previousDuration.raw > DURATION_RATIO_MIN_LIMIT &&
      diff > DURATION_DIFF_MIN_LIMIT;
  }

  if (!changeMeaningfulEnough) {
    return null;
  }

  return (
    <s.Container>
      {percentile.changeVerified ? (
        <>
          {renderArrowIcon(percentile, theme)}
          {getStatusString(percentile)}
        </>
      ) : (
        <>Evaluating</>
      )}
    </s.Container>
  );
};
