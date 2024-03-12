import styled from "styled-components";
import { ButtonContainerProps, ContentProps } from "./types";

export const ContentContainer = styled.div`
  display: flex;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.field.border};
  color: ${({ theme }) => theme.colors.field.text};
  position: relative;
`;

export const Content = styled.div<ContentProps>`
  width: 100%;
  max-height: 200px;
  padding: 6px 28px 6px 8px;
  overflow: ${({ $multiline }) => ($multiline ? "auto" : "hidden")};
  white-space: ${({ $multiline }) => ($multiline ? "pre-line" : "nowrap")};
  ${({ $multiline }) =>
    $multiline ? "word-wrap: break-word" : "text-overflow: ellipsis"};
`;

export const ButtonContainer = styled.div<ButtonContainerProps>`
  position: absolute;
  right: ${({ $scrollbarOffset }) => $scrollbarOffset + 4}px;
  ${({ $position }) => {
    switch ($position) {
      case "top":
        return "top: 4px;";
      case "center":
        return `
        top: 0;
        bottom: 0;
        margin: auto;
        height: fit-content;
        `;
    }
  }}
`;
