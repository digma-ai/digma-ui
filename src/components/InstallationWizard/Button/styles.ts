import styled from "styled-components";
import { ButtonProps } from "./types";

export const Button = styled.button<ButtonProps>`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  border-radius: 2px;
  cursor: pointer;
  border: none;

  color: ${({ buttonType }) => {
    switch (buttonType) {
      case "primary":
        return "#b9c2eb";
      case "secondary":
        return "#dadada";
      case "success":
      case "failure":
        return "#1e1e1e";
    }
  }};

  background: ${({ buttonType }) => {
    switch (buttonType) {
      case "primary":
        return "#000";
      case "secondary":
        return "#383838";
      case "success":
        return "#c8e5c9";
      case "failure":
        return "#e4c6c6";
    }
  }};

  width: ${({ buttonType }) =>
    buttonType === "primary" ? "100%" : "max-content"};

  &:hover {
    ${({ buttonType }) => {
      return buttonType === "secondary" ? "background: #2e2e2e;" : "";
    }}
  }

  &:disabled {
    ${({ buttonType }) => (buttonType === "primary" ? "opacity: 0.2;" : "")}
    cursor: initial;
  }
`;

export const ContentContainer = styled.span`
  display: flex;
  gap: 8px;
`;
