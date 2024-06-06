import styled from "styled-components";
import { KeyValue } from "../../Insights/InsightsCatalog/InsightsPage/insightCards/common/InsightCard/KeyValue";
import {
  bodySemiboldTypography,
  footnoteRegularTypography
} from "../../common/App/typographies";
import { Card } from "../../common/v3/Card";

export const StyledCard = styled(Card)`
  cursor: pointer;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ErrorIconContainer = styled.div`
  display: flex;
`;

export const Title = styled.span`
  ${bodySemiboldTypography}

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  direction: rtl;
  text-align: left;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const ScoreContainer = styled.div`
  margin-left: auto;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ColumnsContainer = styled.div`
  display: flex;
  padding: 4px 0;
  gap: 10px;

  & > * {
    flex: 1 1 0;
  }
`;

export const StyledKeyValue = styled(KeyValue)`
  gap: 4px;

  & > *:last-child {
    ${footnoteRegularTypography}
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Footer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  & > * {
    flex: 1 1 0;
  }
`;
