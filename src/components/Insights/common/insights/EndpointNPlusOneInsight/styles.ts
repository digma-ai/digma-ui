import styled from "styled-components";
import { caption1RegularTypography } from "../../../../common/App/typographies";
import { ListItem } from "../../InsightCard/ListItem";

export const SpanDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Description = styled.div`
  display: flex;
  gap: 8px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};

  ${caption1RegularTypography}
`;

export const InfoContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const SpanListItem = styled(ListItem)`
  padding: 4px;
`;
