import styled from "styled-components";
import {
  bodySemiboldTypography,
  footnoteRegularTypography
} from "../../common/App/typographies";
import { Link } from "../../common/v3/Link";
import { Tag } from "../../common/v3/Tag";
import { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 4px;
  padding: 12px;
  border: ${({ theme, $isPinned }) =>
    $isPinned ? `1px solid ${theme.colors.v3.stroke.primary}` : "none"};
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
