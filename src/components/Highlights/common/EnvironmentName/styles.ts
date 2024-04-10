import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  padding: 4px;
`;

export const IconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.disabled};
`;

export const Name = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
