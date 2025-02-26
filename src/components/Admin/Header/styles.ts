import styled from "styled-components";
import { heading1SemiboldTypography } from "../../common/App/typographies";

export const Header = styled.header`
  ${heading1SemiboldTypography}

  padding: 44px 44px 24px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const HomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const FilterContainer = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
`;
