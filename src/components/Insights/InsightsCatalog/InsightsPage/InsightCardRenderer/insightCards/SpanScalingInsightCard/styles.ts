import styled from "styled-components";
import { subscriptRegularTypography } from "../../../../../../common/App/typographies";

export const InsightDescription = styled.span`
  ${subscriptRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
