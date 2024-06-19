import styled from "styled-components";
import { Direction } from "../../../../common/icons/types";
import { ArrowContainerProps } from "./types";

export const Change = styled.span`
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#828797";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
`;

export const ArrowContainer = styled.div<ArrowContainerProps>`
  display: flex;
  color: ${({ theme, $direction }) => {
    if ($direction === Direction.UP) {
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
  }};
`;
