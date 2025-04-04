import styled from "styled-components";
import { footnoteRegularTypography } from "../../App/typographies";
import type {
  ContainerProps,
  IconContainerProps,
  InputProps,
  TextInputControlProps
} from "./types";

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  padding: 4px 6px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme, $focused, $isInvalid }) => {
      if ($isInvalid) {
        return theme.colors.v3.status.high;
      }

      if ($focused) {
        return theme.colors.v3.stroke.brandPrimary;
      }
      return theme.colors.v3.stroke.secondary;
    }};

  ${({ theme, $isInvalid }) => {
    if (!$isInvalid) {
      return;
    }

    return {
      background: theme.colors.v3.status.backgroundHigh
    };
  }};
`;

export const Input = styled.input<InputProps>`
  border: none;
  background: none;
  outline: none;
  display: flex;
  flex-grow: 1;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.v3.text.primary};

  &::placeholder {
    ${({ theme, $isInvalid: $isInValid }) => {
      if ($isInValid) {
        return `color:${theme.colors.v3.status.high}`;
      }
    }};
  }
`;

export const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  align-items: center;
  ${({ theme, $isInvalid }) => {
    if ($isInvalid) {
      return `color:${theme.colors.v3.status.high}`;
    }
  }};
`;

export const TextInputControl = styled.div<TextInputControlProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $alwaysRenderError }) => ($alwaysRenderError ? "4px" : "8px")};
`;

export const ErrorMessage = styled.div`
  min-height: 16px;
  color: ${({ theme }) => theme.colors.v3.status.high};
  ${footnoteRegularTypography}
`;
