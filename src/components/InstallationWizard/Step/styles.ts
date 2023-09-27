import styled, { DefaultTheme } from "styled-components";
import {
  ContainerProps,
  HeaderProps,
  NumberContainerProps,
  NumberProps
} from "./types";

const HEADER_HEIGHT = 44; // in pixels;

export const Container = styled.div<ContainerProps>`
  ${({ transitionClassName, transitionDuration, contentHeight }) => {
    const totalHeight = HEADER_HEIGHT + contentHeight;
    return `
      &.${transitionClassName}-enter {
        height: ${HEADER_HEIGHT}px;
      }
      
      &.${transitionClassName}-enter-active {
        height: ${totalHeight}px;
        transition: height ${transitionDuration}ms ease-out;
      }

      &.${transitionClassName}-exit {
        height: ${totalHeight}px;
      }

      &.${transitionClassName}-exit-active {
        height: ${HEADER_HEIGHT}px;
        transition: height ${transitionDuration}ms ease-out;
      }
      `;
  }}
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#ebecf0";
      case "dark":
      case "dark-jetbrains":
        return "#393b40";
    }
  }};
  height: ${({ status, contentHeight }) =>
    status === "active"
      ? `${HEADER_HEIGHT + contentHeight}`
      : `${HEADER_HEIGHT}`}px;
  overflow: hidden;
  flex-shrink: 0;
`;

export const Header = styled.div<HeaderProps>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  font-weight: 700;
  font-size: 16px;
  text-transform: capitalize;
  border-top: 1px solid
    ${({ theme }) => {
      switch (theme.mode) {
        case "light":
          return "#b9c0d4";
        case "dark":
        case "dark-jetbrains":
          return "#49494d";
      }
    }};
  height: ${HEADER_HEIGHT}px;
  box-sizing: border-box;
  color: ${({ theme, status }) => {
    switch (theme.mode) {
      case "light":
        return status === "active" ? "#494b57" : "#818594";
      case "dark":
      case "dark-jetbrains":
        return status === "active" ? "#dfe1e5" : "#b4b8bf";
    }
  }};
  transition: color ${({ transitionDuration }) => transitionDuration}ms ease-out;
  cursor: ${({ status }) => {
    return status === "completed" ? "pointer" : "initial";
  }};
`;

export const NumberContainer = styled.div<NumberContainerProps>`
  width: 18px;
  height: 18px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme, isActive }) => {
    switch (theme.mode) {
      case "light":
        return isActive ? "#f1f5fa" : "#b9c0d4";
      case "dark":
      case "dark-jetbrains":
        return isActive ? "#fff" : "#383838";
    }
  }};
  transition-duration: ${({ transitionDuration }) => transitionDuration}ms;
  transition-property: color;
  transition-timing-function: ease-out;
`;

export const getNumberBackgroundColor = (theme: DefaultTheme): string => {
  switch (theme.mode) {
    case "light":
      return "#4d668a";
    case "dark":
    case "dark-jetbrains":
      return "#6a6dfa";
  }
};

export const Number = styled.span<NumberProps>`
  line-height: 100%;
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-weight: 500;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background: ${({ theme, status }) =>
    status === "completed" ? "none" : getNumberBackgroundColor(theme)};

  ${({ theme, transitionClassName, transitionDuration }) => {
    return `
      &.${transitionClassName}-enter {
        background: none;
        opacity: 0;
      }
      
      &.${transitionClassName}-enter-active {
        background: ${getNumberBackgroundColor(theme)};
        opacity: 1;
        transition-property: opacity, background;
        transition-duration: ${transitionDuration}ms;
        transition-timing-function: ease-out;
      }

      &.${transitionClassName}-exit {
        background: ${getNumberBackgroundColor(theme)};
        opacity: 1;
      }

      &.${transitionClassName}-exit-active {
        background: none;
        opacity: 0;
        transition-property: opacity, background;
        transition-duration: ${transitionDuration}ms;
        transition-timing-function: ease-out;
      }
      `;
  }}
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
