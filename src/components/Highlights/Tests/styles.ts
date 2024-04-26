import styled from "styled-components";
import {
  bodyRegularTypography,
  bodySemiboldTypography
} from "../../common/App/typographies";

export const CardTitle = styled.div`
  ${bodySemiboldTypography}
`;

export const TestsStatsContainer = styled.div`
  ${bodyRegularTypography}

  display: flex;
  gap: 12px;
  ${/* TODO: use the correct color */ ""}
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const TestsStats = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
