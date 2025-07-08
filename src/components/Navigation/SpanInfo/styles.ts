import styled from "styled-components";
import { subscriptRegularTypography } from "../../common/App/typographies";
import { CodeSnippet } from "../../common/CodeSnippet";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.v3.surface.brandDark};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 8px;
  padding: 8px 8px 12px;
  width: 100%;
`;

export const StyledCodeSnippet = styled(CodeSnippet)`
  max-height: 140px;
  overflow: auto;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-grow: 1;
  overflow: hidden;

  & > * {
    flex: 1 1 0;
  }
`;

export const Stat = styled.div`
  ${subscriptRegularTypography}

  display: flex;
  align-items: center;
  gap: 4px;
  overflow: hidden;
`;

export const StatIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const StatValueContainer = styled.div`
  display: flex;
  gap: 4px;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  overflow: hidden;
  align-items: center;
`;

export const StatValueText = styled.span`
  color: ${({ theme }) => theme.colors.v3.text.primary};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const CollapseButton = styled.div`
  ${subscriptRegularTypography}

  font-family: inherit;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.v3.text.link};
`;
