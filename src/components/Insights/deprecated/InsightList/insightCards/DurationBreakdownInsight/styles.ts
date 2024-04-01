import styled from "styled-components";

export const EntryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Entry = styled.span`
  display: flex;
  gap: 4px;
  justify-content: space-between;
  font-weight: 500;
`;

export const EntryName = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Duration = styled.span`
  flex-shrink: 0;
`;

export const DurationTitle = styled.span`
  white-space: pre;
`;
