import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 12px 20px;
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.recentActivity.header.text};
`;
