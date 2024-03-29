import styled from "styled-components";

export const LocalEngineStatusBadge = styled.div`
  border-radius: 1px;
  border: 2px solid ${({ theme }) => theme.colors.v3.status.backgroundSuccess};
  background: ${({ theme }) => theme.colors.v3.status.success};
  width: 16px;
  height: 16px;
  box-sizing: border-box;
`;
