import styled from "styled-components";
import type { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f7f8fa";
      case "dark":
      case "dark-jetbrains":
        return "#2b2d30";
    }
  }};
  border: 1px solid
    ${({ theme, $focused }) => {
      if ($focused) {
        switch (theme.mode) {
          case "light":
            return "#383a42";
          case "dark":
          case "dark-jetbrains":
            return "#dfe1e5";
        }
      }

      switch (theme.mode) {
        case "light":
          return "#c9ccd6";
        case "dark":
        case "dark-jetbrains":
          return "#4e5157";
      }
    }};
`;

export const Input = styled.input`
  border: none;
  background: none;
  outline: none;
  display: flex;
  flex-grow: 1;
  font-size: 14px;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};

  &::placeholder {
    color: ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#494b57";
        case "dark":
        case "dark-jetbrains":
          return "#dfe1e5";
      }
    }};
  }
`;
