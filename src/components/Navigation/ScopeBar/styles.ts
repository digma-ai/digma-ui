import styled from "styled-components";
import { ScopeBarElementProps } from "./types";

export const ScopeBar = styled.div<ScopeBarElementProps>`
  display: flex;
  flex-grow: 1;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  background: ${({ theme, $isActive }) =>
    $isActive
      ? theme.colors.v3.surface.brandDark
      : theme.colors.v3.surface.primary};
  box-shadow: 0 0 4.9px 0 rgb(0 0 0 / 13%);
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
  height: 18px;
  background: ${({ theme }) => theme.colors.v3.stroke.primaryLight};
`;
