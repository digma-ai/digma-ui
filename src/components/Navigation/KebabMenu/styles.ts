import styled from "styled-components";

export const ObservabilityListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
`;

export const ObservabilityToggleSwitchContainer = styled.div`
  margin-left: auto;
`;

export const LocalEngineStatusBadge = styled.div`
  border-radius: 1px;
  border: 2px solid ${({ theme }) => theme.colors.v3.status.backgroundSuccess};
  background: ${({ theme }) => theme.colors.v3.status.success};
  width: 16px;
  height: 16px;
  box-sizing: border-box;
`;
