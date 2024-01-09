import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.panel.background};
  min-height: 100vh;
  display: flex;
`;

export const NoDataContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
