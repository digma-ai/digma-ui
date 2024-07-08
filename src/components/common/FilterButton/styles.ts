import styled from "styled-components";
import {
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../App/typographies";
import { ButtonProps } from "./types";

export const Button = styled.button<ButtonProps>`
  border-radius: 4px;
  padding: 6px 8px;
  display: flex;
  gap: 4px;
  align-items: center;
  border: 1px solid
    ${({ theme, $hasSelectedItems, $isActive }) => {
      if ($hasSelectedItems || $isActive) {
        return theme.colors.v3.surface.brandPrimary;
      }

      return theme.colors.v3.stroke.primary;
    }};
  background: ${({ theme, $hasSelectedItems, $isActive }) => {
    if ($hasSelectedItems || $isActive) {
      return theme.colors.v3.surface.brandDark;
    }

    return theme.colors.v3.surface.primary;
  }};
  box-shadow: 1px 1px 4px 0 rgb(0 0 0 / 25%);
  color: ${({ theme }) => theme.colors.icon.primary};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

export const Title = styled.span`
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const Number = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: ${({ theme }) => theme.colors.v3.surface.brandTertiary};
  ${footnoteRegularTypography}
`;
