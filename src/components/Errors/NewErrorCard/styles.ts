import styled from "styled-components";
import {
  bodySemiboldTypography,
  footnoteRegularTypography
} from "../../common/App/typographies";
import { Link } from "../../common/v3/Link";
import { Tag } from "../../common/v3/Tag";
import { HEIGHT } from "./OccurrenceChart/styles";
import { ContainerProps, OccurrenceChartContainerProps } from "./types";

export const TRANSITION_DURATION = 300;
export const chartContainerTransitionClassName = "chart-container";

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 4px;
  padding: 12px;
  border: 1px solid
    ${({ theme, $isPinned, $isCritical }) =>
      $isPinned
        ? theme.colors.v3.stroke.primary
        : $isCritical
        ? theme.colors.v3.pieChart.darkRed
        : theme.colors.v3.surface.secondary};
  background: ${({ theme, $isCritical }) =>
    $isCritical
      ? theme.colors.v3.pieChart.darkRed
      : theme.colors.v3.surface.secondary};
`;

export const Header = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-grow: 1;
  overflow: hidden;
`;

export const Title = styled.span`
  ${bodySemiboldTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  direction: rtl;
  text-align: left;
`;

export const StatusTag = styled(Tag)`
  flex-shrink: 0;
`;

export const StatusTagTooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SourceLink = styled(Link)`
  max-width: 100%;
`;

export const AffectedEndpointsContainer = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  flex-direction: column;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const OccurrenceChartContainer = styled.div<OccurrenceChartContainerProps>`
  margin-top: -8px;
  overflow: hidden;
  height: ${HEIGHT}px;

  ${({ $transitionClassName, $transitionDuration }) => `
    &.${$transitionClassName}-enter {
      height: 0;
      opacity: 0;
    }
    
    &.${$transitionClassName}-enter-active {
      height: ${HEIGHT}px;
      opacity: 1;
      transition: height ${$transitionDuration}ms ease-out, opacity ${$transitionDuration}ms ease-out;
    }

    &.${$transitionClassName}-exit {
      height: ${HEIGHT}px;
      opacity: 1;
    }
    
    &.${$transitionClassName}-exit-active {
      height: 0;
      opacity: 0;
      transition: height ${$transitionDuration}ms ease-out, opacity ${$transitionDuration}ms ease-out;
    }
  `}
`;

export const Footer = styled.div`
  margin-top: -8px;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;
