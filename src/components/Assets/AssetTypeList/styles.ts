import styled from "styled-components";
import { subscriptRegularTypography } from "../../common/App/typographies";
import { Link } from "../../common/v3/Link";

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px 8px;
  margin: 0;
`;

export const ParentLink = styled(Link)`
  text-decoration: underline;
  ${subscriptRegularTypography}
`;
