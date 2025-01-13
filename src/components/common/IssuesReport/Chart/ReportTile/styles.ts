import styled from "styled-components";
import { subheading2BoldTypography } from "../../../App/typographies";

export const TooltipContent = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const StyledLink = styled.a`
  ${subheading2BoldTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
  text-decoration: none;
  white-space: nowrap;

  :hover {
    text-decoration: underline;
  }
`;
