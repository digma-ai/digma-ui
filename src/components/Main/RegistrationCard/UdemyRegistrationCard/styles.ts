import styled from "styled-components";
import { subscriptRegularTypography } from "../../../common/App/typographies";

export const Description = styled.div`
  ${subscriptRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.secondary};
  text-align: center;
`;
