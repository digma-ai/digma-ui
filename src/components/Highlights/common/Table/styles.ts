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
`;

export const TableBodyCell = styled.td`
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EnvironmentNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;
