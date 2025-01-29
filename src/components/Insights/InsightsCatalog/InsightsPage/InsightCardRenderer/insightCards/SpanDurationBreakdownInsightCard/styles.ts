import styled from "styled-components";
import { footnoteRegularTypography } from "../../../../../../common/App/typographies";
import { ListItem } from "../common/InsightCard/ListItem";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  gap: 8px;
`;

export const DurationTitle = styled.span`
  white-space: pre;
`;

export const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TableHead = styled.div`
  ${footnoteRegularTypography}

  padding: 0 8px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const TableHeadRow = styled.div`
  display: flex;
  padding: 0 8px;
  justify-content: space-between;
`;

export const TableHeaderCell = styled.div`
  text-align: start;
  overflow: hidden;
  display: flex;
  gap: 4px;
  align-items: center;

  &:last-child {
    text-align: end;
    justify-content: end;
  }
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TableBodyRow = styled.div`
  display: flex;
  padding: 6px 8px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  justify-content: space-between;
`;

export const TableBodyCell = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:last-child {
    justify-content: flex-end;
  }
`;

export const TableItem = styled(ListItem)`
  overflow: hidden;
  height: 24px;
`;
