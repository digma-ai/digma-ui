import styled from "styled-components";
import { TabProps } from "./types";

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
  flex-grow: 1;
  flex-basis: 0;
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

export const Indicator = styled.div`
  border-radius: 50%;
  width: 4px;
  height: 4px;
  background: ${({ theme }) => theme.colors.v3.status.success};
`;