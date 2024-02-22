import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 4px 6px 4px 4px;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.attachmentTag.border};
  background: ${({ theme }) => theme.colors.attachmentTag.background};
  color: ${({ theme }) => theme.colors.attachmentTag.text};
  align-items: center;
  max-width: fit-content;
`;

export const IconContainer = styled.div`
  padding: 2px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.attachmentTag.icon.stroke};
  background: ${({ theme }) => theme.colors.attachmentTag.icon.background};
  display: flex;
`;

export const TextContainer = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
