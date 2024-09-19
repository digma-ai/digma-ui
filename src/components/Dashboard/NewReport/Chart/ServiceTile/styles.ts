import styled from "styled-components";
import { Link } from "../../../../common/v3/Link";

export const StatsMainNumber = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const TooltipContent = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.v3.text.primary};
  font-size: 32px;
  font-weight: 700;
  line-height: normal;

  :hover {
    text-decoration: underline;
  }
`;
