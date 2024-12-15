import styled from "styled-components";
import type { DefaultTheme } from "styled-components/dist/types";
import type { ButtonElementProps, ButtonType, LabelProps } from "./types";

const getButtonStyles = (
  theme: DefaultTheme,
  type: ButtonType,
  state: "default" | "hover" | "focus" | "disabled"
) => {
  const backgroundColor = theme.colors.button[type].background;
  const borderColor = theme.colors.button[type].border;

  return `
    color: ${theme.colors.button[type].icon[state]};
    background: ${backgroundColor ? backgroundColor[state] : "none"};
    border: ${borderColor ? `1px solid ${borderColor[state]}` : "none"};
  `;
};

export const Label = styled.span<LabelProps>`
  font-size: ${({ $size }) => {
    if ($size === "large") {
      return "16px";
    }
    return "13px";
  }};
`;

export const Button = styled.button<ButtonElementProps>`
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0;
  cursor: pointer;
  width: fit-content;
  padding: ${({ $size }) => {
    if ($size === "large") {
      return "4px 8px";
    }
    return "4px";
  }};
  ${({ theme, $type }) => getButtonStyles(theme, $type, "default")}

  ${Label} {
    color: ${({ theme, $type }) => theme.colors.button[$type].text.default};
  }

  &:hover {
    ${({ theme, $type }) => getButtonStyles(theme, $type, "hover")}

    ${Label} {
      color: ${({ theme, $type }) => theme.colors.button[$type].text.hover};
    }
  }

  &:focus,
  &:active {
    ${({ theme, $type }) => getButtonStyles(theme, $type, "focus")}

    ${Label} {
      color: ${({ theme, $type }) => theme.colors.button[$type].text.focus};
    }
  }

  &:disabled {
    cursor: initial;
    ${({ theme, $type }) => getButtonStyles(theme, $type, "disabled")}

    ${Label} {
      color: ${({ theme, $type }) => theme.colors.button[$type].text.disabled};
    }
  }
`;
