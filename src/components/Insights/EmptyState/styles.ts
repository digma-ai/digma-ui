import styled from "styled-components";
import { Link as CommonLink } from "../../common/Link";
import { Spinner as CommonSpinner } from "../../common/v3/Spinner";
import { Link } from "../styles";

export const Spinner = styled(CommonSpinner)`
  color: ${({ theme }) => theme.colors.v3.surface.gray};
`;

export const TroubleshootingLink = styled(CommonLink)`
  font-size: 14px;
  text-decoration: underline;
`;

export const SlackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
`;
