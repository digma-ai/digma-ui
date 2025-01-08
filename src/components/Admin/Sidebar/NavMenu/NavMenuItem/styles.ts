import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { subscriptRegularTypography } from "../../../../common/App/typographies";
import { NavigationList } from "../styles";
import type { ContainerProps } from "./types";

export const Container = styled.li<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 8px;
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.v3.surface.primary : "none"};
`;

export const menuItemStyles = css`
  ${subscriptRegularTypography}

  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border-radius: 8px;
  padding: 12px 16px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};

  &:hover {
    color: ${({ theme }) => theme.colors.v3.text.primary};
    background: ${({ theme }) => theme.colors.v3.surface.primary};
  }
`;

export const ItemLink = styled(NavLink)`
  ${menuItemStyles}
  text-decoration: none;
  padding: 12px 16px;

  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.v3.text.primary};
    background: ${({ theme }) => theme.colors.v3.surface.primary};
  }
`;

export const SubListItemLink = styled(ItemLink)`
  padding: 8px 16px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};

  &:hover,
  &.active {
    background: none;
  }

  &.active {
    color: ${({ theme }) => theme.colors.v3.text.link};
  }
`;

export const SubList = styled(NavigationList)`
  gap: 0;
`;

export const ChevronIconContainer = styled.div`
  margin-left: auto;
  display: flex;
`;
