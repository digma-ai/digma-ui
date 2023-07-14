import { DefaultTheme, useTheme } from "styled-components";
import { getThemeKind } from "../../common/App/styles";
import * as s from "./styles";
import { EmptyStateProps } from "./types";

const getIconColor = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return "#fbfdff";
    case "dark":
    case "dark-jetbrains":
      return "#9b9b9b";
  }
};

export const EmptyState = (props: EmptyStateProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);
  const iconColor = getIconColor(theme);

  return (
    <s.Container>
      {props.icon && (
        <s.IconContainer>
          <props.icon size={72} color={iconColor} themeKind={themeKind} />
        </s.IconContainer>
      )}
      <s.Title>{props.title}</s.Title>
      {props.content}
    </s.Container>
  );
};
