import styled, { css } from "styled-components";
import { ButtonElementProps } from "./types";

const activeStyles = css<ButtonElementProps>`
  color: ${({ theme, $type }) => {
    switch ($type) {
      case "tertiary":
      case "secondary":
        return theme.colors.v3.icon.primary;
      case "primary":
      default:
        return theme.colors.v3.icon.white;
    }
  }};
  border: ${({ theme, $type }) => {
    switch ($type) {
      case "tertiary":
        return "none";
      case "secondary":
        return `1px solid ${theme.colors.v3.stroke.primary}`;
      case "primary":
      default:
        return `1px solid ${theme.colors.v3.surface.brandSecondary}`;
    }
  }};
  background: ${({ theme, $type }) => {
    switch ($type) {
      case "tertiary":
        return "none";
      case "secondary":
        return theme.colors.v3.surface.brandDark;
      case "primary":
      default:
        return theme.colors.v3.surface.brandPrimary;
    }
  }};
`;

export const Button = styled.button<ButtonElementProps>`
  font-family: inherit;
  border-radius: 4px;
  display: flex;
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
  padding: ${({ $type }) => {
    switch ($type) {
      case "tertiary":
        return 6;
      case "secondary":
      case "primary":
      default:
        return 5;
    }
  }}px;
  color: ${({ theme, $type }) => {
    switch ($type) {
      case "tertiary":
      case "secondary":
        return theme.colors.v3.icon.tertiary;
      case "primary":
      default:
        return theme.colors.v3.icon.white;
    }
  }};
  border: ${({ theme, $type }) => {
    switch ($type) {
      case "tertiary":
        return "none";
      case "secondary":
        return `1px solid ${theme.colors.v3.stroke.dark}`;
      case "primary":
      default:
        return `1px solid ${theme.colors.v3.surface.brandTertiary}`;
    }
  }};
  background: ${({ theme, $type }) => {
    switch ($type) {
      case "tertiary":
        return "none";
      case "secondary":
        return theme.colors.v3.surface.primary;
      case "primary":
      default:
        return theme.colors.v3.surface.brandTertiary;
    }
  }};

  ${({ $type }) =>
    $type === "secondary"
      ? css`
          box-shadow: 0 2px 4px 0 rgb(0 0 0 / 13%);
        `
      : ""};

  ${({ $isHighlighted }) => ($isHighlighted ? activeStyles : "")}

  &:disabled {
    cursor: initial;
    color: ${({ theme, $type }) => {
      switch ($type) {
        case "tertiary":
        case "secondary":
          return theme.colors.v3.icon.disabled;
        case "primary":
        default:
          return theme.colors.v3.icon.tertiary;
      }
    }};
    border: ${({ theme, $type }) => {
      switch ($type) {
        case "tertiary":
          return "none";
        case "secondary":
          return `1px solid ${theme.colors.v3.stroke.tertiary}`;
        case "primary":
        default:
          return `1px solid ${theme.colors.v3.surface.gray}`;
      }
    }};
    background: ${({ theme, $type }) => {
      switch ($type) {
        case "tertiary":
          return "none";
        case "secondary":
          return theme.colors.v3.surface.primaryLight;
        case "primary":
        default:
          return theme.colors.v3.surface.gray;
      }
    }};
  }

  &:hover:enabled {
    color: ${({ theme, $type }) => {
      switch ($type) {
        case "tertiary":
        case "secondary":
          return theme.colors.v3.icon.primary;
        case "primary":
        default:
          return theme.colors.v3.icon.white;
      }
    }};
    border: ${({ theme, $type }) => {
      switch ($type) {
        case "tertiary":
          return "none";
        case "secondary":
          return `1px solid ${theme.colors.v3.stroke.primary}`;
        case "primary":
        default:
          return `1px solid ${theme.colors.v3.surface.brandSecondary}`;
      }
    }};
    background: ${({ theme, $type }) => {
      switch ($type) {
        case "tertiary":
          return "none";
        case "secondary":
          return theme.colors.v3.surface.primary;
        case "primary":
        default:
          return theme.colors.v3.surface.brandSecondary;
      }
    }};
  }

  &:active:enabled {
    ${activeStyles}
  }
`;
