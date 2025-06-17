import styled from "styled-components";
import {
  bodyRegularTypography,
  heading2BoldTypography,
  subheading1BoldTypography,
  subheading1RegularTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { PromptInput } from "../common/PromptInput";
import { SearchInput } from "../common/SearchInput";
import type { TableCellContentProps } from "./types";

export const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 24px;
`;

export const Header = styled.header`
  ${heading2BoldTypography}
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 24px 24px;
  gap: 24px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const StyledSearchInput = styled(SearchInput)`
  width: 251px;
  flex-grow: 0;
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
`;

export const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const TableHead = styled.div`
  ${subheading1BoldTypography}
  display: flex;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  height: 70px;
`;

export const TableHeadRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const TableHeaderCell = styled.div`
  box-sizing: border-box;
  padding: 0 16px;
`;

export const TableHeaderCellContent = styled.div<TableCellContentProps>`
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) => $align ?? "left"};
  gap: 4px;
  ${({ onClick }) => (onClick ? "cursor: pointer;" : "")}
`;

export const SortingOrderIconContainer = styled.div`
  display: flex;
`;

export const TableBody = styled.div`
  ${bodyRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
  display: flex;
  flex-direction: column;
`;

export const TableBodyRow = styled.div`
  display: flex;
  height: 70px;
  box-sizing: border-box;
  border-top: 1px solid
    ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};

  &:nth-child(even) {
    background: ${({ theme }) => theme.colors.v3.surface.primary};
  }
`;

export const TableBodyCell = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0 16px;
  border-left: 1px solid
    ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};
  border-right: 1px solid
    ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};

  &:first-child {
    border-left: none;
  }

  &:last-child {
    border-right: none;
  }
`;

export const RecordNumber = styled.span`
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const Condition = styled.span`
  ${subheading1BoldTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const Directive = styled.span`
  ${subheading1RegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const SelectedConditionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
  color: ${({ theme }) => theme.colors.v3.text.primary};
  font-size: 14px;
  font-weight: 600;
`;

export const SelectedConditionsList = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  height: 35px;
  overflow: auto;
`;

export const SelectedConditionTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  background: ${({ theme }) => theme.colors.v3.surface.brandTertiary};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  font-size: 16px;
  line-height: 20px;
`;

export const StyledPromptInput = styled(PromptInput)`
  height: 96px;
  ${/* TODO: change to color from the theme */ ""}
  border: 1px solid #6063f6;

  & > textarea {
    height: 100%;

    &::placeholder {
      color: ${({ theme }) => theme.colors.v3.text.primary};
    }
  }
`;
