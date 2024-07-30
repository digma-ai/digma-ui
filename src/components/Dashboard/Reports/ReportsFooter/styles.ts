import styled from "styled-components";
import { caption1RegularTypography } from "../../../common/App/typographies";

export const LogoContainer = styled.div`
  display: flex;
  padding: 16px 32px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  border-top: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  gap: 8px;
  justify-content: center;
  width: 100%;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  ${caption1RegularTypography}
  margin-top: auto;
`;
