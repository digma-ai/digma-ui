import styled from "styled-components";
import { EnvironmentBarProps } from "./types";

export const GlobeIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const EnvironmentBar = styled.div<EnvironmentBarProps>`
  box-sizing: border-box;
  overflow: hidden;
  flex-grow: 1;
  user-select: none;
  padding: 6px;
  font-size: 14px;
  gap: 4px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme, $isMenuOpen }) =>
      $isMenuOpen
        ? theme.colors.v3.stroke.primaryLight
        : theme.colors.v3.stroke.primary};
  background: ${({ theme, $isMenuOpen, $isActive }) =>
    $isActive
      ? theme.colors.v3.surface.brandDark
      : $isMenuOpen
      ? theme.colors.v3.surface.primaryLight
      : theme.colors.v3.surface.primary};
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 13%);
  display: flex;
  align-items: center;
  color: ${({ theme, $isMenuOpen }) =>
    $isMenuOpen
      ? theme.colors.v3.text.primary
      : theme.colors.v3.text.secondary};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "initial" : "pointer")};

  &:hover {
    border: 1px solid
      ${({ theme, $isDisabled }) =>
        $isDisabled
          ? theme.colors.v3.stroke.primary
          : theme.colors.v3.stroke.primaryLight};
    color: ${({ theme, $isDisabled }) =>
      $isDisabled
        ? theme.colors.v3.text.secondary
        : theme.colors.v3.text.primary};

    & ${GlobeIconContainer} {
      opacity: ${({ $isDisabled }) => ($isDisabled ? 1 : 0.5)};
      color: ${({ theme, $isDisabled }) =>
        $isDisabled
          ? theme.colors.v3.icon.tertiary
          : theme.colors.v3.text.secondary};
    }
  }
`;

export const SelectedEnvironmentName = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.link};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const ChevronIconContainer = styled.div`
  margin-left: auto;
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.secondary};
`;
