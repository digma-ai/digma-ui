import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-spacing: 0 3px;
  font-weight: 400;
  color: #dadada;
`;

export const TableBody = styled.tbody`
  background: #1e1e1e;

  & tr:first-child td:first-child {
    border-top-left-radius: 12px;
  }

  & tr:first-child td:last-child {
    border-top-right-radius: 12px;
  }

  & tr:last-child td:first-child {
    border-bottom-left-radius: 12px;
  }

  & tr:last-child td:last-child {
    border-bottom-right-radius: 12px;
  }
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
