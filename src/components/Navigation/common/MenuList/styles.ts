import styled from "styled-components";
import type { ListItemIconContainerProps, ListItemProps } from "./types";

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  user-select: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
`;

export const ListGroupName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 8px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const ListGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ListGroupDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.v3.stroke.primary};
  margin: 8px 0;
`;

export const ListItem = styled.li<ListItemProps>`
  display: flex;
  padding: 4px 8px;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  color: ${({ theme, $isDisabled, $isHighlighted }) =>
    $isDisabled
      ? theme.colors.v3.text.disabled
      : $isHighlighted
      ? theme.colors.v3.text.link
      : theme.colors.v3.text.primary};
  cursor: ${({ $isDisabled }) => ($isDisabled ? "initial" : "pointer")};

  &:hover {
    background: ${({ theme, $isDisabled }) =>
      $isDisabled ? "initial" : theme.colors.v3.surface.highlight};
  }

  &:active {
    background: ${({ theme, $isDisabled }) =>
      $isDisabled ? "initial" : theme.colors.v3.surface.gray};
  }
`;

export const ListItemIconContainer = styled.div<ListItemIconContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: ${({ theme, $isHighlighted, $isDisabled }) =>
    $isDisabled
      ? theme.colors.v3.icon.disabled
      : $isHighlighted
      ? theme.colors.v3.icon.brandTertiary
      : theme.colors.v3.icon.tertiary};

  &:hover,
  &:active {
    color: ${({ theme, $isHighlighted, $isDisabled }) =>
      $isDisabled
        ? theme.colors.v3.icon.disabled
        : $isHighlighted
        ? theme.colors.v3.icon.brandTertiary
        : theme.colors.v3.icon.primary};
  }
`;

export const ListItemLabel = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
