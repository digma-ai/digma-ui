import styled from "styled-components";
import { ButtonElementProps } from "./types";

export const Button = styled.button<ButtonElementProps>`
  font-family: inherit;
  font-weight: 500;
  font-size: 14px;
  padding: 4px 8px;
  height: 22px;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  user-select: none;
  color: ${({ theme, buttonType }) => {
    if (buttonType === "tertiary") {
      switch (theme.mode) {
        case "light":
          return "#3538cd";
        case "dark":
        case "dark-jetbrains":
          return "#e2e7ff";
      }
    }

    if (buttonType === "secondary") {
      switch (theme.mode) {
        case "light":
          return "#3538cd";
        case "dark":
        case "dark-jetbrains":
          return "#e2e7ff";
      }
    }

    return "#e2e7ff";
  }};
  background: ${({ buttonType }) => {
    if (buttonType === "tertiary") {
      return "none";
    }

    if (buttonType === "secondary") {
      return "none";
    }

    return "#5154ec";
  }};
  border: ${({ buttonType }) => {
    if (buttonType === "secondary") {
      return "1px solid #3538cd";
    }

    return "none";
  }};

  &:hover,
  &:focus {
    color: ${({ theme, buttonType }) => {
      if (buttonType === "tertiary") {
        switch (theme.mode) {
          case "light":
            return "#5154ec";
          case "dark":
          case "dark-jetbrains":
            return "#92affa";
        }
      }

      if (buttonType === "secondary") {
        switch (theme.mode) {
          case "light":
            return "#5154ec";
          case "dark":
          case "dark-jetbrains":
            return "#e2e7ff";
        }
      }

      return "#e2e7ff";
    }};
    background: ${({ buttonType }) => {
      if (buttonType === "tertiary") {
        return "none";
      }

      if (buttonType === "secondary") {
        return "none";
      }

      return "#5154ec";
    }};
    border: ${({ buttonType }) => {
      if (buttonType === "secondary") {
        return "1px solid #5154ec";
      }

      return "none";
    }};
  }

  &:active {
    color: ${({ theme, buttonType }) => {
      if (buttonType === "tertiary") {
        switch (theme.mode) {
          case "light":
            return "#5154ec";
          case "dark":
          case "dark-jetbrains":
            return "#7891d0";
        }
      }

      if (buttonType === "secondary") {
        switch (theme.mode) {
          case "light":
            return "#3538cd";
          case "dark":
          case "dark-jetbrains":
            return "#e2e7ff";
        }
      }

      switch (theme.mode) {
        case "light":
          return "#fbfdff";
        case "dark":
        case "dark-jetbrains":
          return "#dadada";
      }
    }};
    background: ${({ buttonType }) => {
      if (buttonType === "tertiary") {
        return "none";
      }

      if (buttonType === "secondary") {
        return "none";
      }

      return "#3538cd";
    }};
    border: ${({ buttonType }) => {
      if (buttonType === "secondary") {
        return "1px solid #3538cd";
      }

      return "none";
    }};
  }

  &:disabled {
    cursor: initial;
    color: ${({ theme, buttonType }) => {
      if (buttonType === "tertiary") {
        switch (theme.mode) {
          case "light":
            return "#b9c0d4";
          case "dark":
          case "dark-jetbrains":
            return "#49494d";
        }
      }

      if (buttonType === "secondary") {
        switch (theme.mode) {
          case "light":
            return "#b9c0d4";
          case "dark":
          case "dark-jetbrains":
            return "#49494d";
        }
      }

      switch (theme.mode) {
        case "light":
          return "#f1f5fa";
        case "dark":
        case "dark-jetbrains":
          return "#49494d";
      }
    }};
    background: ${({ theme, buttonType }) => {
      if (buttonType === "tertiary") {
        return "none";
      }

      if (buttonType === "secondary") {
        return "none";
      }

      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#2e2e2e";
      }
    }};
    border: ${({ theme, buttonType }) => {
      if (buttonType === "secondary") {
        switch (theme.mode) {
          case "light":
            return "#b9c0d4";
          case "dark":
          case "dark-jetbrains":
            return "#49494d";
        }
      }

      return "none";
    }};
  }
`;

export const ContentContainer = styled.span`
  display: flex;
  gap: 4px;
  align-items: center;
`;
