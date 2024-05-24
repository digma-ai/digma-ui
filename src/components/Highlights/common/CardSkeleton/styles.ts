import styled from "styled-components";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AssetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 6px;
`;

export const TableContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-grow: 1;

  & > * {
    flex: 1 1 0;
  }
`;

export const TableColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TableCellContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 1px 0;
`;

export const IconSkeletonContainer = styled.div`
  flex-shrink: 0;
`;
