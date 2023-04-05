import styled from "styled-components";
import { ButtonProps } from "./types";

export const Button = styled.button<ButtonProps>`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  cursor: pointer;
  color: #b9c2eb;

  padding: ${({ buttonType }) =>
    buttonType === "primary" ? "4px" : "2px 4px"};

  background: ${({ buttonType }) =>
    buttonType === "primary" ? "#3538cd" : "none"};

  border: ${({ buttonType }) =>
    buttonType === "primary" ? "none" : "1px solid #3538cd"};

  width: ${({ buttonType }) =>
    buttonType === "primary" ? "100%" : "max-content"};

  &:hover {
    color: #dadada;
    border: ${({ buttonType }) =>
      buttonType === "primary" ? "none" : "1px solid #5154ec"};
    background: ${({ buttonType }) =>
      buttonType === "primary" ? "#5154ec" : "none"};
  }

  &:focus {
    color: #dadada;
    background: ${({ buttonType }) =>
      buttonType === "primary" ? "#5154ec" : "none"};
  }

  &:disabled {
    background: #2e2e2e;
    color: #49494d;
    cursor: initial;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;
