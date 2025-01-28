import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  flex-shrink: 0;
  box-sizing: border-box;
`;
