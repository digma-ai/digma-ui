import styled, { css } from "styled-components";
import { isNumber } from "../../../typeGuards/isNumber";
import { IndicatorProps, TabProps } from "./types";

export const TabList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const Tab = styled.li<TabProps>`
  display: flex;
  user-select: none;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  gap: 4px;
  padding: 0 4px;
  height: 32px;
  box-sizing: border-box;
  flex-grow: 1;
  flex-basis: 0;
  ${({ $width }) =>
    isNumber($width)
      ? css`
          width: ${$width}px;
          flex: none;
        `
      : ""}
  cursor: ${({ $isSelected, $isDisabled }) =>
    $isSelected || $isDisabled ? "initial" : "pointer"};
  color: ${({ theme, $isSelected, $isDisabled }) => {
    if ($isDisabled) {
      return theme.colors.v3.text.disabled;
    }

    if ($isSelected) {
      return theme.colors.v3.text.primary;
    }

    return theme.colors.v3.text.secondary;
  }};
  border-bottom: ${({ theme, $isSelected }) =>
    $isSelected ? `1px solid ${theme.colors.v3.stroke.brandPrimary}` : "none"};

  &:hover {
    border-bottom: ${({ theme, $isDisabled }) =>
      $isDisabled
        ? "none"
        : `1px solid ${theme.colors.v3.stroke.brandPrimary}`};
  }
`;

export const Indicator = styled.div<IndicatorProps>`
  border-radius: 50%;
  width: 4px;
  height: 4px;
  background: ${({ theme, type }) => {
    switch (type) {
      case "new":
        return theme.colors.v3.status.success;
      case "errors":
        return theme.colors.v3.status.high;
      default:
        return "none";
    }
  }};
`;
