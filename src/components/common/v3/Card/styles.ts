import styled from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { darkTheme } from "../../App/themes/darkTheme";
import { lightTheme } from "../../App/themes/lightTheme";

const getStroke = (theme: DefaultTheme) => {
  switch (theme.mode) {
    case "light":
      return lightTheme.v3.stroke.primary;
    case "dark":
    case "dark-jetbrains":
      return darkTheme.v3.stroke.primary;
  }
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => getStroke(theme)};
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return lightTheme.v3.surface.secondary;
      case "dark":
      case "dark-jetbrains":
        return darkTheme.v3.surface.secondary;
    }
  }};

  &:last-child {
    border: none;
  }
`;

export const Content = styled.div`
  border: 1px solid ${({ theme }) => getStroke(theme)};
  padding: 8px;
`;

export const Header = styled.div`
  border: 1px solid ${({ theme }) => getStroke(theme)};
  padding: 8px;
`;

export const Footer = styled.div`
  padding: 8px;
`;
