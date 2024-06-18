import styled from "styled-components";
import { Popup } from "../common/Popup";
import { EnvironmentBarElementProps } from "./types";

export const EnvironmentIconContainer = styled.div`
  display: flex;
`;

export const ChevronIconContainer = styled.div`
  margin-left: auto;
  display: flex;
`;

export const EnvironmentBar = styled.div<EnvironmentBarElementProps>`
  overflow: hidden;
  flex-grow: 1;
  user-select: none;
  padding: 5px 8px;
  font-size: 14px;
  gap: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 13%);
  border: 1px solid
    ${({ theme, $isMenuOpen }) =>
      $isMenuOpen
        ? theme.colors.v3.stroke.primaryLight
        : theme.colors.v3.stroke.primary};
  background: ${({ theme, $isDisabled, $isMenuOpen }) =>
    $isDisabled
      ? theme.colors.surface.primary
      : $isMenuOpen
        ? theme.colors.v3.surface.primaryLight
        : theme.colors.v3.surface.brandDark};
  color: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.colors.v3.text.secondary : theme.colors.v3.text.link};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "initial" : "pointer")};

  & ${EnvironmentIconContainer} {
    color: ${({ theme, $isDisabled, $isMenuOpen }) =>
      $isDisabled
        ? theme.colors.v3.icon.disabled
        : $isMenuOpen
          ? theme.colors.v3.icon.secondary
          : theme.colors.v3.text.tertiary};
  }

  & ${ChevronIconContainer} {
    color: ${({ theme, $isDisabled }) =>
      $isDisabled
        ? theme.colors.v3.icon.disabled
        : theme.colors.v3.icon.tertiary};
  }

  &:hover {
    border: 1px solid
      ${({ theme, $isDisabled }) =>
        $isDisabled
          ? theme.colors.v3.stroke.primary
          : theme.colors.v3.stroke.primaryLight};

    & ${EnvironmentIconContainer} {
      color: ${({ theme, $isDisabled }) =>
        $isDisabled
          ? theme.colors.v3.icon.disabled
          : theme.colors.v3.text.secondary};
    }
  }
`;

export const SelectedEnvironmentName = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const EnvironmentMenuPopup = styled(Popup)`
  width: 100%;
`;
