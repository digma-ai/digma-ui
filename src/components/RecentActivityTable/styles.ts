import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-weight: 400;
`;

export const TableBody = styled.tbody`
  border-radius: 12px;
  background: #1e1e1e;
`;

export const Head = styled.thead`
  font-size: 10px;
  line-height: 16px;
  height: 16px;
  color: #49494d;
`;

export const ColumnHeader = styled.th`
  text-align: start;
  padding: 8px 0;

  &:first-child {
    padding-left: 12px;
  }
`;

export const TraceButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Suffix = styled.span`
  margin-left: 2px;
  font-size: 10px;
  color: #7c7c94;
`;

export const DataRow = styled.tr`
  height: 36px;
`;

export const DataCell = styled.td`
  &:first-child {
    padding-left: 12px;
  }

  &:last-child {
    padding-right: 12px;
  }
`;
