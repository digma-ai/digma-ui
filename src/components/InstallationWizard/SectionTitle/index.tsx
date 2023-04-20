import { DefaultTheme, useTheme } from "styled-components";
import * as s from "./styles";
import { SectionTitleProps } from "./types";

const getIconColor = (theme: DefaultTheme): string => {
  switch (theme.mode) {
    case "light":
      return "#4d668a";
    case "dark":
    case "dark-jetbrains":
      return "#fff";
  }
};

export const SectionTitle = (props: SectionTitleProps) => {
  const theme = useTheme();

  return (
    <s.Container className={props.className}>
      {props.icon && (
        <s.IconContainer>
          <props.icon size={16} color={getIconColor(theme)} />
        </s.IconContainer>
      )}
      {props.children}
    </s.Container>
  );
};
