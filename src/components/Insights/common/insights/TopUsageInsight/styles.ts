import styled from "styled-components";
import {
  caption2RegularTypography,
  footnoteRegularTypography
} from "../../../../common/App/typographies";
import { Link as CommonLink } from "../../../../common/Link";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FlowData = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  flex-direction: column;
  gap: 8px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  overflow: hidden;
`;

export const SubsequentSpan = styled.div`
  display: flex;
  gap: 8px;
`;

export const ArrowIconContainer = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FullSpanName = styled.span`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
`;

export const SpanNamePart = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Link = styled(CommonLink)`
  ${footnoteRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.link};
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TableHead = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const TableHeadRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const TableHeaderCell = styled.div`
  ${caption2RegularTypography}

  text-align: start;
  overflow: hidden;

  &:first-child {
    padding-left: 8px;
  }

  &:last-child {
    text-align: end;
    padding-right: 8px;
  }
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TableBodyRow = styled.div`
  display: flex;
  gap: 12px;
  padding: 8px 0;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;

export const TableBodyCell = styled.div`
  display: flex;
  align-items: flex-start;
  overflow: hidden;

  &:first-child {
    padding-left: 8px;
  }

  &:last-child {
    padding-right: 8px;
    justify-content: flex-end;
  }
`;
