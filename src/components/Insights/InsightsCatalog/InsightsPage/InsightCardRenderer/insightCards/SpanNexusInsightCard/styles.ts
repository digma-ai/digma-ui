import styled from "styled-components";
import { subscriptRegularTypography } from "../../../../../../common/App/typographies";

export const Description = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  gap: 8px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
