import styled from "styled-components";
import { footnoteRegularTypography } from "../../../../../../common/App/typographies";
import { ListItem } from "../common/InsightCard/ListItem";

export const InsightDescription = styled.span`
  ${footnoteRegularTypography}
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const RootCause = styled.div`
  align-items: center;
  justify-content: space-between;
  gap: 4px;
`;

export const StyledListItem = styled(ListItem)`
  height: 32px;
`;
