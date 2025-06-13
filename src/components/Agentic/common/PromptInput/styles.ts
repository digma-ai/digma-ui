import styled from "styled-components";
import type { FormProps, TextAreaProps } from "./types";

export const FORM_TOP_BOTTOM_PADDING = 16; // in pixels
export const TEXT_AREA_MIN_HEIGHT = 32; // in pixels
export const TEXT_AREA_DEFAULT_FONT_SIZE = 20; // in pixels
export const TEXT_AREA_LINE_HEIGHT = 1.2; // line height multiplier

export const Form = styled.form<FormProps>`
  display: flex;
  padding: ${FORM_TOP_BOTTOM_PADDING}px 64px ${FORM_TOP_BOTTOM_PADDING}px 24px;
  gap: 24px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  overflow: hidden;
  position: relative;
  height: ${({ $height }) => $height}px;
  box-sizing: border-box;
  flex-shrink: 0;
`;

export const TextArea = styled.textarea<TextAreaProps>`
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  font-size: ${({ $fontSize }) => $fontSize}px;
  background: none;
  border: none;
  outline: none;
  resize: none;
  width: 100%;
  padding: 0;
  height: ${({ $height }) => $height}px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.v3.text.tertiary};
  }
`;

export const SubmitButton = styled.button`
  position: absolute;
  top: 16px;
  right: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 31px;
  height: 32px;
  padding: 8px 5px 8px 10px;
  border-radius: 8px;
  background: rgb(255 255 255 / 5%);
  color: ${({ theme }) => theme.colors.v3.icon.primary};
  border: none;
  cursor: pointer;
  flex-shrink: 0;

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.v3.icon.disabled};
  }
`;
