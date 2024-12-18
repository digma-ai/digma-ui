import styled from "styled-components";
import { Link } from "../../common/Link";
import { Spinner as CommonSpinner } from "../../common/v3/Spinner";

export const Spinner = styled(CommonSpinner)`
  color: ${({ theme }) => theme.colors.v3.surface.gray};
`;

export const SlackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 4px;
`;
