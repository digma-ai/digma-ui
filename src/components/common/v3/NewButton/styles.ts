import styled, { css } from "styled-components";
import { subscriptRegularTypography } from "../../App/typographies";
import { ButtonElementProps } from "./types";

export const Button = styled.button<ButtonElementProps>`
  ${subscriptRegularTypography}

  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  width: fit-content;
  padding: ${({ $type }) => {
    switch ($type) {
      case "borderlessPrimary":
        return "6px 8px";
      case "secondary":
      case "primary":
      default:
        return "5px 7px";
    }
  }};
  color: ${({ theme, $type }) => {
    switch ($type) {
      case "borderlessPrimary":
      case "secondary":
        return theme.colors.v3.icon.primary;
      case "primary":
      default:
        return theme.colors.v3.icon.white;
    }
  }};
  border: ${({ theme, $type }) => {
    switch ($type) {
      case "borderlessPrimary":
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
      case "borderlessPrimary":
        return "none";
      case "secondary":
        return theme.colors.v3.surface.primary;
      case "primary":
      default:
        return theme.colors.v3.surface.brandTertiary;
    }
  }};

  span {
    color: ${({ theme, $type }) => {
      switch ($type) {
        case "borderlessPrimary":
        case "secondary":
          return theme.colors.v3.text.primary;
        case "primary":
        default:
          return theme.colors.v3.text.white;
      }
    }};
  }

  ${({ $type }) =>
    $type === "secondary"
      ? css`
          box-shadow: 0 2px 4px 0 rgb(0 0 0 / 13%);
        `
      : ""};

  &:disabled {
    cursor: initial;
    color: ${({ theme, $type }) => {
      switch ($type) {
        case "borderlessPrimary":
        case "secondary":
          return theme.colors.v3.icon.disabled;
        case "primary":
        default:
          return theme.colors.v3.icon.tertiary;
      }
    }};
    border: ${({ theme, $type }) => {
      switch ($type) {
        case "borderlessPrimary":
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
        case "borderlessPrimary":
          return "none";
        case "secondary":
          return theme.colors.v3.surface.primaryLight;
        case "primary":
        default:
          return theme.colors.v3.surface.gray;
      }
    }};

    span {
      color: ${({ theme, $type }) => {
        switch ($type) {
          case "borderlessPrimary":
          case "secondary":
            return theme.colors.v3.text.disabled;
          case "primary":
          default:
            return theme.colors.v3.text.tertiary;
        }
      }};
    }
  }

  &:hover:enabled {
    color: ${({ theme, $type }) => {
      switch ($type) {
        case "borderlessPrimary":
          return theme.colors.v3.icon.brandTertiary;
        case "secondary":
          return theme.colors.v3.icon.primary;
        case "primary":
        default:
          return theme.colors.v3.icon.white;
      }
    }};
    border: ${({ theme, $type }) => {
      switch ($type) {
        case "borderlessPrimary":
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
        case "borderlessPrimary":
          return "none";
        case "secondary":
          return theme.colors.v3.surface.brandDark;
        case "primary":
        default:
          return theme.colors.v3.surface.brandSecondary;
      }
    }};

    span {
      color: ${({ theme, $type }) => {
        switch ($type) {
          case "borderlessPrimary":
            return theme.colors.v3.text.link;
          case "secondary":
            return theme.colors.v3.text.primary;
          case "primary":
          default:
            return theme.colors.v3.text.white;
        }
      }};
    }
  }

  &:focus:enabled,
  &:active:enabled {
    color: ${({ theme, $type }) => {
      switch ($type) {
        case "borderlessPrimary":
          return theme.colors.v3.icon.brandSecondary;
        case "secondary":
          return theme.colors.v3.icon.primary;
        case "primary":
        default:
          return theme.colors.v3.icon.white;
      }
    }};
    border: ${({ theme, $type }) => {
      switch ($type) {
        case "borderlessPrimary":
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
        case "borderlessPrimary":
          return "none";
        case "secondary":
          return theme.colors.v3.surface.primary;
        case "primary":
        default:
          return theme.colors.v3.surface.brandPrimary;
      }
    }};

    span {
      color: ${({ theme, $type }) => {
        switch ($type) {
          case "borderlessPrimary":
            return theme.colors.v3.surface.brandSecondary;
          case "secondary":
            return theme.colors.v3.text.primary;
          case "primary":
          default:
            return theme.colors.v3.text.white;
        }
      }};
    }
  }
`;
