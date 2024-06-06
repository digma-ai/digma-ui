import styled from "styled-components";
import { KeyValue } from "../../Insights/InsightsCatalog/InsightsPage/insightCards/common/InsightCard/KeyValue";
import {
  bodySemiboldTypography,
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../common/App/typographies";
import { Card } from "../../common/v3/Card";
import { Content as CardContent } from "../../common/v3/Card/styles";

export const Container = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

export const ErrorDetailsCard = styled(Card)`
  height: 100%;
  min-height: 450px;
  overflow: hidden;

  & > ${CardContent}:first-child {
    height: initial;
  }

  & > ${CardContent}:last-child {
    overflow: hidden;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const TitleRow = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
`;

export const BackButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const Title = styled.span`
  ${bodySemiboldTypography}

  direction: rtl;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const ScoreContainer = styled.div`
  margin-left: auto;
`;

export const SubtitleRow = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  gap: 7px;
  color: ${({ theme }) => theme.colors.v3.text.disabled};
  padding-left: 24px;
`;

export const LocationName = styled.span`
  ${subscriptRegularTypography}

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  height: 100%;
`;

export const ColumnsContainer = styled.div`
  display: flex;
  gap: 8px;

  & > * {
    flex: 1 1 0;
  }
`;

export const StyledKeyValue = styled(KeyValue)`
  gap: 4px;
  flex-shrink: 0;

  & > *:first-child {
    color: ${({ theme }) => theme.colors.v3.text.tertiary};
  }

  & > *:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ServicesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ServicesIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const FlowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  height: 100%;
`;

export const FlowPagination = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const FlowsCountNumber = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const CurrentFlowNumber = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
