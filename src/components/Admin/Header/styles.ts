import styled from "styled-components";
import { heading1SemiboldTypography } from "../../common/App/typographies";

export const Header = styled.header`
  ${heading1SemiboldTypography}

  height: 104px;
  padding: 44px 44px 24px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
