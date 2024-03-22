import styled from "styled-components";
import { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid
    ${({ theme, $focused }) => {
      if ($focused) {
        return theme.colors.v3.stroke.brandPrimary;
      }
      return theme.colors.v3.stroke.dark;
    }};
`;

export const Input = styled.input`
  border: none;
  background: none;
  outline: none;
  display: flex;
  flex-grow: 1;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
