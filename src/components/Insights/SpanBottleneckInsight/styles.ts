import styled from "styled-components";

export const SpanList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SpanContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Span = styled.span`
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: fit-content;
`;
