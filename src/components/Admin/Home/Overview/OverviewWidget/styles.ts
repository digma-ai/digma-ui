import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 8px;
  border-radius: 12px;
  width: 279px;
  height: 108px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  flex-shrink: 0;
  box-sizing: border-box;
`;