import { DefaultTheme, useTheme } from "styled-components";
import { ArrowIcon } from "../../../common/icons/ArrowIcon";
import { Direction } from "../../../common/icons/types";
import { LiveDataDurationPercentile } from "../types";
import * as s from "./styles";
import { ChangeStatusProps } from "./types";

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
    percentile.currentDuration.raw === percentile.previousDuration.raw
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
      dashed={!percentile.changeVerified}
      color={getArrowIconColor(direction, theme)}
      size={16}
    />
  );
};

export const ChangeStatus = ({ percentile }: ChangeStatusProps) => {
  const theme = useTheme();

  return (
    <s.Container>
      {renderArrowIcon(percentile, theme)}
      {getStatusString(percentile)}
      {!percentile.changeVerified && (
        <s.EvaluatingBadge>Evaluating</s.EvaluatingBadge>
      )}
    </s.Container>
  );
};
