import styled from "styled-components";
import {
  grayScale,
  greenScale,
  primaryScale,
  redScale
} from "../../App/getTheme";
import { ContainerProps, IconContainerProps, InputProps } from "./types";

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme, $focused, $isValid }) => {
      if ($isValid === false) {
        switch (theme.mode) {
          case "light":
            return redScale[500];
          case "dark":
          case "dark-jetbrains":
            return redScale[300];
        }
      }

      if ($focused) {
        return primaryScale[300];
      }

      switch (theme.mode) {
        case "light":
          return grayScale[300];
        case "dark":
        case "dark-jetbrains":
          return grayScale[700];
      }
    }};
  background: ${({ theme, $isValid }) => {
    if ($isValid === false) {
      switch (theme.mode) {
        case "light":
          return redScale[200];
        case "dark":
        case "dark-jetbrains":
          return redScale[400];
      }
    }

    return "none";
  }};
`;

export const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  color: ${({ theme, $isValid }) => {
    if ($isValid === false) {
      switch (theme.mode) {
        case "light":
          return redScale[500];
        case "dark":
        case "dark-jetbrains":
          return redScale[300];
      }
    }

    switch (theme.mode) {
      case "light":
        return grayScale[800];
      case "dark":
      case "dark-jetbrains":
        return grayScale[200];
    }
  }};
`;

export const ValidationStatusIconContainer = styled(IconContainer)`
  color: ${({ theme, $isValid }) => {
    if ($isValid === true) {
      return greenScale[300];
    }

    if ($isValid === false) {
      switch (theme.mode) {
        case "light":
          return redScale[500];
        case "dark":
        case "dark-jetbrains":
          return redScale[300];
      }
    }
  }};
`;

export const Input = styled.input<InputProps>`
  border: none;
  background: none;
  outline: none;
  display: flex;
  flex-grow: 1;
  font-size: 14px;
  color: ${({ theme, $isValid }) => {
    if ($isValid === false) {
      switch (theme.mode) {
        case "light":
          return redScale[500];
        case "dark":
        case "dark-jetbrains":
          return redScale[300];
      }
    }

    switch (theme.mode) {
      case "light":
        return grayScale[900];
      case "dark":
      case "dark-jetbrains":
        return grayScale[100];
    }
  }};

  &::placeholder {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return grayScale[400];
        case "dark":
        case "dark-jetbrains":
          return grayScale[600];
      }
    }};
  }
`;
