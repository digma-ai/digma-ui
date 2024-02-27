import styled from "styled-components";

export const ContentContainer = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
`;

export const Description = styled.div`
  display: flex;
  gap: 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
