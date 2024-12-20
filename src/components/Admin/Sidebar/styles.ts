import styled from "styled-components";
import type { NavigationListItemProps } from "./types";

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 230px;
  padding: 40px 24px 32px;
  border-right: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  box-sizing: border-box;
  flex-shrink: 0;
`;

export const Logo = styled.img`
  align-self: start;
  height: 23px;
`;

export const NavigationList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NavigationListItem = styled.li<NavigationListItemProps>`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.v3.text.primary : theme.colors.v3.text.tertiary};
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.v3.surface.primary : "none"};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.v3.text.primary};
    background: ${({ theme }) => theme.colors.v3.surface.primary};
  }
`;

export const LogoutButton = styled(NavigationListItem)`
  margin-top: auto;
`;
