import styled, { css } from "styled-components";
import type { ButtonElementProps } from "./types";

export const Button = styled.button<ButtonElementProps>`
  font-size: 13px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  cursor: pointer;
  width: fit-content;
  padding: 4px 8px;
  border: 1px solid transparent;
  color: ${({ theme }) => theme.colors.v3.icon.white};
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

  span {
    color: ${({ theme }) => theme.colors.v3.text.white};
  }

  &:disabled {
    cursor: initial;
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
    border: 1px solid
      ${({ theme, $type }) => {
        switch ($type) {
          case "tertiary":
            return "none";
          case "secondary":
            return theme.colors.v3.stroke.tertiary;
          case "primary":
          default:
            return "none";
        }
      }};
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

    span {
      color: ${({ theme, $type }) => {
        switch ($type) {
          case "tertiary":
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
    background: ${({ theme, $type }) => {
      switch ($type) {
        case "tertiary":
          return "transparent";
        case "secondary":
          return theme.colors.v3.surface.brandDark;
        case "primary":
        default:
          return theme.colors.v3.surface.brandSecondary;
      }
    }};
    border: 1px solid
      ${({ theme, $type }) => {
        switch ($type) {
          case "tertiary":
            return "transparent";
          case "secondary":
            return theme.colors.v3.stroke.primary;
          case "primary":
          default:
            return theme.colors.v3.surface.brandSecondary;
        }
      }};

    ${({ $type }) =>
      $type === "tertiary"
        ? css`
            color: ${({ theme }) => theme.colors.v3.icon.brandTertiary};
          `
        : ""};

    span {
      ${({ $type }) =>
        $type === "tertiary"
          ? css`
              color: ${({ theme }) => theme.colors.v3.text.link};
            `
          : ""};
    }
  }

  &:focus:enabled,
  &:active:enabled {
    background: ${({ theme, $type }) => {
      switch ($type) {
        case "tertiary":
          return "transparent";
        case "secondary":
          return theme.colors.v3.surface.primary;
        case "primary":
        default:
          return theme.colors.v3.surface.brandPrimary;
      }
    }};
    border: 1px solid
      ${({ theme, $type }) => {
        switch ($type) {
          case "tertiary":
            return "transparent";
          case "secondary":
            return theme.colors.v3.stroke.primary;
          case "primary":
          default:
            return theme.colors.v3.surface.brandSecondary;
        }
      }};

    ${({ $type }) =>
      $type === "tertiary"
        ? css`
            color: ${({ theme }) => theme.colors.v3.icon.brandTertiary};
          `
        : ""};

    span {
      ${({ $type }) =>
        $type === "tertiary"
          ? css`
              color: ${({ theme }) => theme.colors.v3.text.link};
            `
          : ""};
    }
  }
`;
