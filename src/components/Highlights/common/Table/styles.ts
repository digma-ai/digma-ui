import styled from "styled-components";
import {
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";

export const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  border-spacing: 0 4px;
`;

export const TableHead = styled.thead`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  padding-bottom: 4px;
`;

export const TableHeaderCell = styled.th`
  ${footnoteRegularTypography}

  padding: 0 2px;
  text-align: start;
  vertical-align: top;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
`;

export const TableBodyRow = styled.tr`
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
  height: 28px;

  &:hover {
    background: ${({ theme }) => theme.colors.v3.surface.primaryLight};
    cursor: pointer;
  }
`;

export const TableBodyCell = styled.td`
  padding: 0 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:first-child {
    padding-left: 0;
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    padding-right: 0;
    border-radius: 0 4px 4px 0;
  }
`;

export const EnvironmentNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;
