import styled, { css } from "styled-components";
import { subscriptRegularTypography } from "../../../common/App/typographies";
import { KebabMenuButton } from "../../../common/KebabMenuButton";
import {
  ContainerProps,
  LabelProps,
  StyledKebabMenuButtonProps
} from "./types";

export const StyledKebabMenuButton = styled(
  KebabMenuButton
)<StyledKebabMenuButtonProps>`
  color: ${({ theme, $isMenuOpen }) =>
    $isMenuOpen ? theme.colors.v3.icon.primary : theme.colors.v3.icon.tertiary};

  &:hover,
  &:focus,
  &:active {
    color: ${({ theme, $isSelected, $isMenuOpen }) =>
      $isSelected || $isMenuOpen
        ? theme.colors.v3.icon.primary
        : theme.colors.v3.icon.tertiary};
  }
`;

export const Container = styled.li<ContainerProps>`
  ${subscriptRegularTypography}

  display: flex;
  cursor: pointer;
  padding: 0 8px;
  user-select: none;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  color: ${({ theme, $isSelected }) =>
    $isSelected
      ? theme.colors.v3.icon.primary
      : theme.colors.v3.icon.secondary};

  ${({ $isSelected }) =>
    $isSelected
      ? css`
          background: ${({ theme }) => theme.colors.v3.surface.primaryLight};
          border-bottom: 1px solid
            ${({ theme }) => theme.colors.v3.stroke.brandPrimary};
        `
      : ""}
`;

export const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Label = styled.span<LabelProps>`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 110px;
  color: ${({ theme, $isSelected }) =>
    $isSelected
      ? theme.colors.v3.text.primary
      : theme.colors.v3.text.secondary};
`;
