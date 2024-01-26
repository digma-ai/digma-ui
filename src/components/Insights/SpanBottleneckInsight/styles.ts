import styled from "styled-components";

export const SpanList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Span = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const SpanDetails = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: hidden;
`;

export const SpanName = styled.span`
  font-weight: 500;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: fit-content;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const RowStat = styled.div`
  display: flex;
  font-size: 14px;
  flex-direction: row;
  gap: 8px;
  overflow: hidden;
`;

export const Container = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: column;
`;
