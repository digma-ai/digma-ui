import styled from "styled-components";
import { ScopeBarProps } from "./types";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  box-sizing: border-box;
`;

export const Row = styled.div`
  display: flex;
  gap: 4px;
`;

export const KebabMenu = styled.div`
  margin-top: auto;
  display: flex;
  gap: 8px;
`;

export const TabsContainer = styled.div`
  margin-top: auto;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid ${({ theme }) => `${theme.colors.stroke.secondary}`};
`;

export const ScopeBar = styled.div<ScopeBarProps>`
  display: flex;
  flex-grow: 1;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  background: ${({ theme, $isActive }) =>
    $isActive
      ? theme.colors.v3.surface.brandDark
      : theme.colors.v3.surface.primary};
  box-shadow: 0 0 4.9px 0 rgba(0 0 0 / 13%);
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.v3.text.link : theme.colors.v3.text.secondary};
  font-size: 14px;
  padding: 5px 2px;
  overflow: hidden;
`;

export const ScopeName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  padding: 0 4px;
  user-select: none;
`;

export const ScopeBarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
  padding: 2px 4px;

  &:disabled {
    color: ${({ theme }) => theme.colors.v3.icon.disabled};
    cursor: initial;
  }

  &:active:enabled,
  &:hover:enabled {
    color: ${({ theme }) => theme.colors.v3.icon.primary};
  }
`;

export const ScopeBarDivider = styled.div`
  width: 1px;
  height: 100%;
  background: ${({ theme }) => theme.colors.v3.stroke.primaryLight};
`;
