import styled from "styled-components";
import type { MenuButtonProps } from "./types";

export const MenuButton = styled.button<MenuButtonProps>`
  border: 1px solid
    ${({ theme, $isOpen }) =>
      $isOpen ? theme.colors.stroke.brand : theme.colors.stroke.primary};
  background: ${({ theme }) => theme.colors.surface.secondary};
  border-radius: 4px;
  padding: 4px 6px 4px 4px;
  display: flex;
  gap: 10px;
  align-items: center;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.stroke.secondary};
  }

  &:focus,
  &:active {
    border: 1px solid ${({ theme }) => theme.colors.stroke.brand};
  }
`;

export const MenuButtonLabel = styled.span`
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.base};
`;

export const IconContainer = styled.span`
  display: flex;
  padding: 2px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.surface.brand};
  color: ${({ theme }) => theme.colors.icon.white};
`;

export const SelectedEntriesNumberPlaceholder = styled.span`
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#494b57";
      case "dark":
      case "dark-jetbrains":
        return "#dfe1e5";
    }
  }};
  user-select: none;
`;

export const Number = styled.span`
  min-width: 18px;
  height: 18px;
  flex-shrink: 0;
  font-size: 14px;
  line-height: 100%;
  font-weight: 500;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #5053d4;
`;

export const MenuChevronIconContainer = styled.span`
  margin-left: auto;
  color: ${({ theme }) => theme.colors.icon.primary};
`;
