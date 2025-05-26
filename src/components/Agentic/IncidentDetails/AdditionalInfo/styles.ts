import styled from "styled-components";
import { bodyRegularTypography } from "../../../common/App/typographies";
import type { TabProps } from "./types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  gap: 24px;
`;

export const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  flex-grow: 1;
  box-sizing: border-box;

  & > * {
    flex: 1 1 0;
  }
`;

export const Tab = styled.div<TabProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.v3.text.primary : theme.colors.v3.text.secondary};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "not-allowed" : "pointer")};
  padding: 7px 4px;
  border-bottom: 1px solid
    ${({ $isActive, theme }) =>
      $isActive ? `${theme.colors.v3.stroke.brandPrimary}` : "transparent"};
  margin-bottom: -1px;
  transition: border-color 300ms;
  overflow: hidden;

  &:first-child {
    margin-left: 12px;
  }

  &:last-child {
    margin-right: 12px;
  }
`;

export const TabTitle = styled.span`
  ${bodyRegularTypography}
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
