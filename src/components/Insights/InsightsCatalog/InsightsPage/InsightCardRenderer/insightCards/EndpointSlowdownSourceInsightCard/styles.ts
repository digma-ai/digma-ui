import styled from "styled-components";
import { subscriptRegularTypography } from "../../../../../../common/App/typographies";

export const SourceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InsightDescription = styled.span`
  padding-bottom: 8px;
  ${subscriptRegularTypography}
`;
