import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;

export const Step = styled.div`
  display: flex;
  gap: 4px;
  flex-direction: column;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-bottom: 16px;
`;

export const StepContainer = styled.div`
  display: flex;
  min-height: 210px;
  flex-direction: column;
  padding: 12px;
`;
