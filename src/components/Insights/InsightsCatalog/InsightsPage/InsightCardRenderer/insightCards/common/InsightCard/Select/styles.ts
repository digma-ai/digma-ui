import styled from "styled-components";
import { bodyRegularTypography } from "../../../../../../../../common/App/typographies";
import type { SelectBarProps } from "./types";

export const ExpandButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  display: flex;
  cursor: inherit;
`;

export const SelectBar = styled.div<SelectBarProps>`
  ${bodyRegularTypography}

  overflow: hidden;
  flex-grow: 1;
  user-select: none;
  padding: 4px 6px;
  gap: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  box-shadow: 1px 1px 4px 0 rgb(0 0 0 / 25%);
  cursor: ${({ $isDisabled }) => ($isDisabled ? "initial" : "pointer")};
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
      : theme.colors.v3.surface.primary};
  color: ${({ theme, $isDisabled }) =>
    $isDisabled
      ? theme.colors.v3.text.disabled
      : theme.colors.v3.text.secondary};

  & ${ExpandButton} {
    color: ${({ theme, $isDisabled }) =>
      $isDisabled
        ? theme.colors.v3.icon.disabled
        : theme.colors.v3.icon.secondary};
  }

  &:hover {
    border: 1px solid
      ${({ theme, $isDisabled }) =>
        $isDisabled
          ? theme.colors.v3.stroke.primary
          : theme.colors.v3.stroke.primaryLight};
  }
`;

export const SelectedValue = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Divider = styled.div`
  width: 1px;
  height: 18px;
  background: ${({ theme }) => theme.colors.v3.stroke.primary};
  margin-left: auto;
`;
