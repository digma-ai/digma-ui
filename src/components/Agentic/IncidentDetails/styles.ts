import styled from "styled-components";
import {
  subheading2RegularTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { Toggle } from "../../common/v3/Toggle";
import { OptionButton } from "../../common/v3/Toggle/styles";
import type { ToggleProps } from "../../common/v3/Toggle/types";
import { textStyles } from "./MarkdownRenderer/styles";
import type { AgentViewMode, BreadcrumbProps } from "./types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .sash {
    --sash-size: 24px;
  }

  .sash-hover {
    --focus-border: none;
  }

  &&&&& .split-view-view::before {
    --separator-border: ${({ theme }) => theme.colors.v3.surface.primary};
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
`;

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px 24px;
  height: 100%;
  box-sizing: border-box;
`;

export const Holder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  flex-shrink: 0;
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 24px;
  height: 100%;
`;

export const BottomContentContainer = styled.div`
  display: flex;
  gap: 24px;
  height: 100%;
  overflow: auto;
`;

export const SummaryContainer = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  min-width: 0;
  overflow: hidden;
  gap: 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;

export const SummaryContainerToolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const StyledToggle = styled(Toggle)<ToggleProps<AgentViewMode>>`
  gap: 8px;

  & > ${OptionButton} {
    ${subscriptRegularTypography}
    justify-content: center;
    padding: 6px 0;
    border-radius: 4px;
    width: 87px;
  }
`;

export const Breadcrumbs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  font-size: 20px;
  height: 40px;
  flex-shrink: 0;
`;

export const BreadcrumbsDivider = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.disabled};
`;

export const Breadcrumb = styled.span<BreadcrumbProps>`
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  cursor: ${({ $isActive }) => ($isActive ? "default" : "pointer")};

  &:hover {
    color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.v3.text.tertiary : theme.colors.v3.text.primary};
    text-decoration: ${({ $isActive }) => ($isActive ? "none" : "underline")};
  }
`;

export const AgentBreadcrumb = styled(Breadcrumb)<BreadcrumbProps>`
  padding: 8px 12px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  cursor: default;

  &:hover {
    color: ${({ theme }) => theme.colors.v3.text.primary};
    text-decoration: none;
  }
`;

export const StatusBar = styled.div`
  display: flex;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.v3.status.success};
  background: ${({ theme }) => theme.colors.v3.status.backgroundSuccess};
  height: 24px;
  flex-shrink: 0;
  margin-bottom: 24px;
`;

export const StatusBarText = styled.span`
  ${subheading2RegularTypography};
  color: ${({ theme }) => theme.colors.v3.text.white};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const IncidentSummaryText = styled.div`
  ${textStyles}
  flex-grow: 1;
  overflow: auto;
`;

export const AdditionalInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 30%;
  min-width: 401px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  flex-shrink: 0;
`;
