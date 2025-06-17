import styled from "styled-components";
import type { CheckmarkComponentProps } from "./types";

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const CheckmarkContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const Checkmark = styled.input<CheckmarkComponentProps>`
  appearance: none;
  cursor: pointer;
  margin: 0;
  border: 1px solid ${({ theme }) => theme.colors.v3.surface.highlight};
  width: ${({ $size }) => ($size === "small" ? 12 : 16)}px;
  height: ${({ $size }) => ($size === "small" ? 12 : 16)}px;
  border-radius: ${({ $size }) => ($size === "small" ? 4 : 6)}px;
  padding: 1px;
  background: ${({ theme }) => theme.colors.v3.surface.highlight};

  &:disabled {
    background: ${({ theme }) => theme.colors.v3.surface.primary};
    border: none;
  }

  &:checked + ${CheckmarkContainer} {
    color: ${({ theme }) => theme.colors.v3.status.success};
  }

  &:disabled + ${CheckmarkContainer} {
    color: ${({ theme }) => theme.colors.v3.icon.disabled};
  }
`;
