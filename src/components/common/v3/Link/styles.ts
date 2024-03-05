import styled from "styled-components";
import { footnoteRegularTypography } from "../../App/typographies";

export const Link = styled.a`
  ${footnoteRegularTypography}

  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.v3.text.link};
  display: block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &:hover,
  &:focus {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#002d61";
        case "dark":
        case "dark-jetbrains":
          return "#e2e7ff";
      }
    }};
  }

  &:active {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#002d61";
        case "dark":
        case "dark-jetbrains":
          return "#7891d0";
      }
    }};
  }

  &:disabled {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#49494d";
      }
    }};
  }
`;
