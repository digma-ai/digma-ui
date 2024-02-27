import styled from "styled-components";
import { SelectBarProps } from "./types";

export const ChevronIconContainer = styled.div`
  margin-left: auto;
  display: flex;
`;

export const SelectBar = styled.div<SelectBarProps>`
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
    ${({ theme, $isOpen }) =>
      $isOpen
        ? theme.colors.v3.stroke.primaryLight
        : theme.colors.v3.stroke.primary};
  background: ${({ theme, $isDisabled, $isOpen }) =>
    $isDisabled
      ? theme.colors.surface.primary
      : $isOpen
      ? theme.colors.v3.surface.primaryLight
      : theme.colors.v3.surface.brandDark};
  color: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.colors.v3.text.secondary : theme.colors.v3.text.link};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "initial" : "pointer")};

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
  }
`;

export const SelectedValue = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
