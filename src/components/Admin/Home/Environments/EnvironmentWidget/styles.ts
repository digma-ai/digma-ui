import styled from "styled-components";
import { bodyBoldTypography } from "../../../../common/App/typographies";

export const Container = styled.div`
  width: 279px;
  height: 185px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${bodyBoldTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
  text-overflow: ellipsis;
`;

export const EnvironmentIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;
