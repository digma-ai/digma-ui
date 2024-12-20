import styled from "styled-components";
import { heading1SemiboldTypography } from "../../../common/App/typographies";

export const GreetingText = styled.span`
  ${heading1SemiboldTypography}
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const Username = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
