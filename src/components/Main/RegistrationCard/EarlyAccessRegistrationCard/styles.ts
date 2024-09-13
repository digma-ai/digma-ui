import styled from "styled-components";
import {
  subheadingSemiboldTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";

export const Description = styled.div`
  ${subscriptRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.secondary};
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  ${subheadingSemiboldTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
  padding: 12px 0;
`;
