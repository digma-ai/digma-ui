import styled, { css } from "styled-components";
import type { ButtonElementProps } from "./types";

const BaseIconButton = styled.button<ButtonElementProps>`
  font-family: inherit;
  display: flex;
  flex-shrink: 0;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  padding: ${({ $size }) => {
    switch ($size) {
      case "small":
        return 3;
      case "medium":
      default:
        return 5;
    }
  }}px;

  &:disabled {
    cursor: initial;
  }
`;

const PrimaryIconButtonActiveStyles = css`
  border: 1px solid ${({ theme }) => theme.colors.v3.surface.brandSecondary};
  background: ${({ theme }) => theme.colors.v3.surface.brandPrimary};
`;

export const PrimaryIconButton = styled(BaseIconButton)`
  color: ${({ theme }) => theme.colors.v3.icon.white};
  border: 1px solid ${({ theme }) => theme.colors.v3.surface.brandTertiary};
  background: ${({ theme }) => theme.colors.v3.surface.brandTertiary};

  ${({ $isHighlighted }) =>
    $isHighlighted ? PrimaryIconButtonActiveStyles : ""}

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.v3.surface.brandSecondary};
    background: ${({ theme }) => theme.colors.v3.surface.brandSecondary};
  }

  &:active {
    ${PrimaryIconButtonActiveStyles}
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.v3.icon.tertiary};
    border: 1px solid ${({ theme }) => theme.colors.v3.surface.gray};
    background: ${({ theme }) => theme.colors.v3.surface.gray};
  }
`;

const SecondaryIconButtonActiveStyles = css`
  color: ${({ theme }) => theme.colors.v3.icon.primary};
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  background: ${({ theme }) => theme.colors.v3.surface.brandDark};
`;

export const SecondaryIconButton = styled(BaseIconButton)`
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 13%);

  ${({ $isHighlighted }) =>
    $isHighlighted ? SecondaryIconButtonActiveStyles : ""}

  &:hover {
    color: ${({ theme }) => theme.colors.v3.icon.primary};
    border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  }

  &:active {
    ${SecondaryIconButtonActiveStyles}
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.v3.icon.disabled};
    border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
    background: ${({ theme }) => theme.colors.v3.surface.primaryLight};
  }
`;

const SecondaryBorderlessIconButtonActiveStyles = css`
  color: ${({ theme }) => theme.colors.v3.icon.primary};
`;

export const SecondaryBorderlessIconButton = styled(BaseIconButton)`
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
  border: 1px solid transparent;
  background: none;

  ${({ $isHighlighted }) =>
    $isHighlighted ? SecondaryBorderlessIconButtonActiveStyles : ""}

  &:hover {
    color: ${({ theme }) => theme.colors.v3.icon.primary};
  }

  &:active {
    ${SecondaryBorderlessIconButtonActiveStyles}
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.v3.icon.disabled};
  }
`;
