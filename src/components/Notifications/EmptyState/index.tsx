import { DefaultTheme, useTheme } from "styled-components";
import { CrossedBellIcon } from "../../common/icons/CrossedBellIcon";
import * as s from "./styles";
import { EmptyStateProps } from "./types";

const getIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#fff";
    case "dark":
    case "dark-jetbrains":
      return "#868a91";
  }
};

export const EmptyState = (props: EmptyStateProps) => {
  const theme = useTheme();
  const iconColor = getIconColor(theme);

  return (
    <s.Container>
      <s.IconContainer>
        <CrossedBellIcon size={72} color={iconColor} />
      </s.IconContainer>
      <s.Title>{props.title}</s.Title>
      {props.content}
    </s.Container>
  );
};
