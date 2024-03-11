import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 8px 0;
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

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
`;

export const EnvironmentMenuContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  bottom: 8px;
  width: 40%;
`;
