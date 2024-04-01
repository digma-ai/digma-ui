import styled from "styled-components";
import { subscriptRegularTypography } from "../../../../../common/App/typographies";

export const Description = styled.div`
  display: flex;
  gap: 8px;
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
