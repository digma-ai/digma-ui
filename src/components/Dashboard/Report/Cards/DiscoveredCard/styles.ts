import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  padding-bottom: 24px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: stretch;
  gap: 8px;
  max-height: 112px;
`;

export const Header = styled.span`
  color: ${({ theme }) => {
    return theme.colors.v3.text.primary;
  }};
  font-size: 24px;
  font-weight: 600;
  padding: 12px 16px;
`;
