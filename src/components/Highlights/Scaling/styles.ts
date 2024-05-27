import styled from "styled-components";
import { bodySemiboldTypography } from "../../common/App/typographies";

export const CardTitle = styled.div`
  ${bodySemiboldTypography}
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CardIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.secondary};
`;
