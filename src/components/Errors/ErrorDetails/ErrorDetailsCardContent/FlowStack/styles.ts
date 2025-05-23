import styled from "styled-components";
import {
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 6px 0 12px;
  gap: 12px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  overflow: hidden;
  height: 100%;
`;

export const StacksContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 12px;
  padding: 0 8px;
`;

export const StackHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StackTitleContainer = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const StackTitle = styled.span`
  ${subscriptRegularTypography}

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
  direction: rtl;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  width: fit-content;
  max-width: 100%;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.v3.stroke.primary};
  flex-shrink: 0;
`;

export const StackContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SpanGroupsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-left: 1px solid ${({ theme }) => theme.colors.v3.surface.gray};
  padding-left: 8px;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  padding: 0 8px;
`;

export const FooterButtonsContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const WorkspaceOnlyToggleLabel = styled.span`
  ${footnoteRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
