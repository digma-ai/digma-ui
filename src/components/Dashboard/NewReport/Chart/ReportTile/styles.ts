import styled from "styled-components";

export const StatsMainNumber = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const TooltipContent = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.v3.text.primary};
  font-size: 32px;
  font-weight: 700;
  line-height: normal;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`;
