import styled from "styled-components";
import type { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  width: 100%;
  background: ${({ theme, $isActive }) =>
    $isActive
      ? theme.colors.v3.surface.brandDarkest
      : theme.colors.v3.surface.secondary};
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 8px 0;
  border-radius: 0 0 12px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  box-sizing: border-box;
  position: relative;
`;

export const Row = styled.div`
  display: flex;
  gap: 4px;
`;

export const KebabMenu = styled.div`
  margin-top: auto;
  display: flex;
  gap: 8px;
`;

export const TabsContainer = styled.div`
  margin-top: auto;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid ${({ theme }) => `${theme.colors.stroke.secondary}`};
`;

export const Background = styled.div`
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  height: 100%;
`;
