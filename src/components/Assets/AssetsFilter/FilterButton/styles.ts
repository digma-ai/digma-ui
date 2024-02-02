import styled from "styled-components";
import { grayScale } from "../../../common/App/getTheme";
import { ButtonProps } from "./types";

export const Button = styled.button<ButtonProps>`
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  gap: 4px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.stroke.primary};
  background: ${({ theme, $hasSelectedItems }) => {
    if ($hasSelectedItems) {
      return theme.colors.surface.brandDark;
    }

    switch (theme.mode) {
      case "light":
        return grayScale[50];
      case "dark":
      case "dark-jetbrains":
        return grayScale[1000];
    }
  }};
  box-shadow: 1px 1px 4px 0 rgba(0 0 0 / 25%);
  color: ${({ theme }) => theme.colors.icon.primary};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.text.subtext};
`;

export const Number = styled.span`
  width: 16px;
  height: 16px;
  font-weight: 500;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #4b4db4;
`;
