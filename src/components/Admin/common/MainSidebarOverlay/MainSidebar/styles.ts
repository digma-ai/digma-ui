import styled from "styled-components";
import type { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  background: ${({ theme }) =>
    `linear-gradient(0deg, ${theme.colors.v3.surface.primary} 0%, ${theme.colors.v3.surface.primary} 100%), #fff`};
  display: flex;
  flex-direction: column;
  border-radius: 8px 0 0 8px;
  height: 100%;
  user-select: ${({ $isResizing }) => ($isResizing ? "none" : "auto")};
`;

export const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  width: 100%;
  overflow-y: auto;
`;

export const ResizeHandle = styled.div`
  width: 16px;
  cursor: ew-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.v3.icon.disabled};

  &:hover {
    color: ${({ theme }) => theme.colors.v3.icon.secondary};
  }
`;

export const TabContentContainer = styled.div`
  display: flex;
  width: 100%;
  overflow-y: auto;
`;
