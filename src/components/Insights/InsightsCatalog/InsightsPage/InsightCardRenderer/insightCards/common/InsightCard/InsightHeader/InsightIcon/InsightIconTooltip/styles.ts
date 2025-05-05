import styled from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 180px;
  padding: 8px;
`;

export const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.v3.stroke.tertiary};
  width: 100%;
`;
