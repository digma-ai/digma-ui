import styled from "styled-components";
import { caption1RegularTypography } from "../../../../common/App/typographies";
import { ListItem } from "../../InsightCard/ListItem";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Description = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.tertiary};

  ${caption1RegularTypography}
`;

export const SpanListItem = styled(ListItem)`
  padding: 4px;
`;
