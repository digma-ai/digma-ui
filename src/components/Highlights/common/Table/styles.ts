import styled from "styled-components";
import {
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-spacing: 4px;
`;

export const TableHead = styled.thead`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  padding-bottom: 4px;
`;

export const TableHeaderCell = styled.th`
  ${footnoteRegularTypography}

  padding: 0;
  text-align: start;
  vertical-align: top;
`;

export const TableBodyRow = styled.tr`
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
  height: 28px;

  /* background: ${({ theme }) => theme.colors.v3.surface.sidePanelHeader}; */
`;

export const TableBodyCell = styled.td`
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  /* &:first-child {
    border-radius: 4px 0 0 4px;
    padding: 6px 4px 6px 8px;
  }

  &:last-child {
    border-radius: 0 4px 4px 0;
    width: 100%;
    padding: 6px 4px;
  } */
`;

export const EnvironmentNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;
