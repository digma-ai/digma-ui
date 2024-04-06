import styled from "styled-components";
import {
  subscriptRegularTypography,
  subscriptSemiboldTypography
} from "../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  min-height: 100%;
`;

export const Header = styled.div`
  display: flex;
  height: 44px;
  align-items: center;
  background: ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};
  box-shadow: 0 9px 24px 0 rgb(0 0 0 / 30%);
  flex-shrink: 0;
  gap: 12px;
  padding: 0 12px;
`;

export const BackButton = styled.button`
  ${subscriptRegularTypography}

  font-family: inherit;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  border: none;
  background: none;
  padding: 0;
  display: flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;
`;

export const Divider = styled.div`
  margin-right: 4px;
  border-radius: 1px;
  width: 1px;
  height: 13px;
  background: ${({ theme }) => theme.colors.v3.stroke.primary};
`;

export const HeaderTitle = styled.span`
  ${subscriptSemiboldTypography}

  padding-left: 4px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
`;
