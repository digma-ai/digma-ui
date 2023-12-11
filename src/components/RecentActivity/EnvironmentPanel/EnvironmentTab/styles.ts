import styled from "styled-components";
import { ContainerProps } from "./types";

export const Container = styled.li<ContainerProps>`
  display: flex;
  cursor: pointer;
  font-size: 13px;
  padding: 0 4px;
  user-select: none;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  color: ${({ theme, $isPending, $isSelected }) => {
    if ($isPending) {
      return theme.colors.tab.text.disabled;
    }

    if ($isSelected) {
      return theme.colors.tab.text.focus;
    }

    return theme.colors.tab.text.default;
  }};
  background: ${({ theme }) => theme.colors.tab.background.default};
  border-bottom: ${({ theme, $isSelected }) =>
    $isSelected ? `1px solid ${theme.colors.tab.borderBottom.focus}` : "none"};

  &:hover,
  &:focus {
    color: ${({ theme, $isPending, $isSelected }) => {
      if ($isPending) {
        return theme.colors.tab.text.disabled;
      }

      if ($isSelected) {
        return theme.colors.tab.text.focus;
      }

      return theme.colors.tab.text.hover;
    }};
    background: ${({ theme }) => theme.colors.tab.background.hover};
    border-bottom: ${({ theme }) =>
      `1px solid ${theme.colors.tab.borderBottom.hover}`};
  }
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Label = styled.span`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 110px;
`;
