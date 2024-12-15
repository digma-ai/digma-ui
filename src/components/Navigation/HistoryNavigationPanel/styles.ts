import styled from "styled-components";
import type { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  background: ${({ $isActive, theme }) =>
    $isActive
      ? theme.colors.v3.surface.brandDark
      : theme.colors.v3.surface.primary};
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 13%);
  padding: 6px 8px;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
  width: fit-content;
  gap: 4px;
  height: 32px;
  box-sizing: border-box;
`;

export const Button = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
  padding: 0;
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};

  &:disabled {
    color: ${({ theme }) => theme.colors.v3.icon.disabled};
    cursor: initial;
  }

  &:hover:enabled,
  &:active:enabled {
    color: ${({ theme }) => theme.colors.v3.icon.primary};
  }
`;
