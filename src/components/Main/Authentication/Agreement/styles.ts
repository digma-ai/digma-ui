import styled from "styled-components";
import { subscriptRegularTypography } from "../../../common/App/typographies";
import { Link as CommonLink } from "../../../common/v3/Link";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  ${subscriptRegularTypography}
`;

export const Link = styled(CommonLink)`
  ${subscriptRegularTypography}
  text-decoration: underline;
  display: inline;
`;
