import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;

export const EnvironmentStep = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 4px;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
`;

export const StepContainer = styled.div`
  display: flex;
  align-items: center;
`;
