import styled from "styled-components";

export const ListItem = styled.li`
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 4px;
  padding: 8px 12px 8px 8px;
  font-size: 14px;
  letter-spacing: -0.1px;
  user-select: none;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const EntryCount = styled.span`
  margin-left: auto;
`;
