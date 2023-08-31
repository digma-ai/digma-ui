import { DefaultTheme, useTheme } from "styled-components";
import { EmptyState as CommonEmptyState } from "../../common/EmptyState";
import { CrossedBellDarkIcon } from "../../common/icons/CrossedBellIconDark";
import { CrossedBellLightIcon } from "../../common/icons/CrossedBellIconLight";
import * as s from "./styles";
import { EmptyStateProps } from "./types";

const getIcon = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return CrossedBellLightIcon;
    case "dark":
    case "dark-jetbrains":
      return CrossedBellDarkIcon;
  }
};

export const EmptyState = (props: EmptyStateProps) => {
  const theme = useTheme();
  const icon = getIcon(theme);
  return (
    <s.Container>
      <CommonEmptyState icon={icon} title={props.title} />
    </s.Container>
  );
};
