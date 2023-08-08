import styled from "styled-components";

export const EntryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Entry = styled.span`
  display: flex;
  justify-content: space-between;
`;

export const EntryName = styled.span`
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
