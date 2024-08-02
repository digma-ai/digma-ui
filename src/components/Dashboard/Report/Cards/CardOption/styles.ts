import styled, { css } from "styled-components";
import {
  bodyRegularTypography,
  displaySemiboldTypography
} from "../../../../common/App/typographies";
import { ContainerProps } from "./types";

export const Title = styled.div`
  ${bodyRegularTypography}
  line-height: 18px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Container = styled.div<ContainerProps>`
  border-radius: 8px;
  border: 1px solid
    ${({ theme, $type, $isActive }) => {
      if ($isActive) {
        switch ($type) {
          case "success":
            return theme.colors.v3.status.success;
          case "high":
            return theme.colors.v3.status.high;
          case "medium":
            return theme.colors.v3.status.medium;
          case "low":
            return theme.colors.v3.status.low;
          default:
            return theme.colors.v3.stroke.primary;
        }
      }
      return theme.colors.v3.stroke.primaryLight;
    }};
  padding: 8px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  flex: 1;
  min-width: 116px;
  color: ${({ theme, $type, $isActive }) => {
    if ($isActive && $type === "high") {
      return theme.colors.v3.status.high;
    }
    return theme.colors.v3.icon.primary;
  }};
  background: ${({ theme, $type, $isActive }) => {
    if ($isActive) {
      switch ($type) {
        case "success":
          return theme.colors.v3.status.backgroundSuccess;
        case "high":
          return theme.colors.v3.status.backgroundHigh;
        case "medium":
          return theme.colors.v3.status.backgroundMedium;
        case "low":
          return theme.colors.v3.status.backgroundLow;
        default:
          return theme.colors.v3.surface.highlight;
      }
    }
    return "none";
  }};

  ${({ $disabled, $type }) =>
    $disabled
      ? css`
          cursor: initial;
          color: ${({ theme }) => theme.colors.v3.text.disabled};
          background: none;
          ${Title} {
            color: ${({ theme }) => theme.colors.v3.text.disabled};
          }
        `
      : css`
          &:hover {
            color: ${({ theme }) => {
              switch ($type) {
                case "high":
                  return theme.colors.v3.status.high;
                default:
                  return theme.colors.v3.icon.primary;
              }
            }};
            background: ${({ theme }) => theme.colors.v3.surface.primaryLight};
          }
        `};
`;

export const Counter = styled.div`
  ${displaySemiboldTypography}
`;
