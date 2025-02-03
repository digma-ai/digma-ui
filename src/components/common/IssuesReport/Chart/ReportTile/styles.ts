import styled from "styled-components";
import {
  subheading2BoldTypography,
  subscriptRegularTypography
} from "../../../App/typographies";

export const TileContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: fit-content;
`;

export const TooltipContent = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const StyledLink = styled.a`
  ${subheading2BoldTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

export const HoverDescription = styled.span`
  ${subscriptRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
  opacity: 0.5;
`;
