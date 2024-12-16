import styled from "styled-components";
import type { PageButtonProps } from "./types";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Button = styled.button`
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.v3.icon.secondary};

  &:disabled {
    cursor: initial;
    color: ${({ theme }) => theme.colors.v3.icon.disabled};
  }
`;

export const PageButtonsContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const PageButton = styled.button<PageButtonProps>`
  padding: 0;
  border: none;
  cursor: pointer;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme, $isActive }) =>
    $isActive
      ? theme.colors.v3.surface.brandPrimary
      : theme.colors.v3.surface.highlight};
`;
