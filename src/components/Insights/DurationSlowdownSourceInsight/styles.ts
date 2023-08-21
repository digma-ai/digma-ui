import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SourceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Source = styled.span`
  display: flex;
  gap: 8px;
`;

export const SourceName = styled.span`
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
