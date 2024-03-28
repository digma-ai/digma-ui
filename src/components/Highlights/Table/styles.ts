import styled from "styled-components";
import {
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";

export const Table = styled.table`
  width: 100%;
  border-spacing: 0 8px;
`;

export const TableHead = styled.thead`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const TableHeaderCell = styled.th`
  ${footnoteRegularTypography}

  text-align: start;
`;

export const TableBodyRow = styled.tr`
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};

  /* background: ${({ theme }) => theme.colors.v3.surface.sidePanelHeader}; */
`;

export const TableBodyCell = styled.td`
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
