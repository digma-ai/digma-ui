import styled from "styled-components";
import {
  bodyRegularTypography,
  heading2BoldTypography,
  subheading1BoldTypography,
  subheading1RegularTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { Overlay } from "../../common/Overlay";
import { AgentChat } from "../common/AgentChat";
import { Form, TextArea } from "../common/PromptInput/styles";
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
  border: 1px solid ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};
`;

export const TableBodyRow = styled.div`
  display: flex;
  height: 70px;
  box-sizing: border-box;
  border-bottom: 1px solid
    ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};

  &:nth-child(even) {
    background: ${({ theme }) => theme.colors.v3.surface.primary};
  }

  &:last-child {
    border-bottom: none;
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

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

export const SelectedConditionsContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const SelectedConditionTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  font-size: 16px;
  line-height: 20px;
  box-shadow: 0 3px 5px 0 rgb(0 0 0 / 13%);
  cursor: pointer;
`;

export const StyledAgentChat = styled(AgentChat)`
  ${/* TODO: change to color from the theme */ ""}
  background: #000;
  border-radius: 8px;
  padding: 24px;
  gap: 12px;
  max-height: 306px;

  & ${Form} {
    height: 117px;
    ${/* TODO: change to color from the theme */ ""}
    border: 1px solid #6063f6;

    & ${TextArea} {
      ${subheading1RegularTypography}
      color: ${({ theme }) => theme.colors.v3.text.primary};
      height: 100%;
    }
  }
`;

export const StyledOverlay = styled(Overlay)`
  align-items: center;
`;
