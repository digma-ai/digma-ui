import styled from "styled-components";
import {
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../../common/App/typographies";
import { Button } from "../../../common/v3/Button";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  padding: 6px 8px 12px;
  gap: 12px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  overflow: hidden;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const TitleContainer = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
`;

export const Title = styled.span`
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
  gap: 4px;
  padding-left: 8px;
  border-left: 1px solid ${({ theme }) => theme.colors.v3.surface.gray};
  overflow: auto;
`;

export const FrameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Span = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.primary};
  display: flex;
  align-items: center;
  overflow: hidden;
  gap: 8px;
`;

export const SpanName = styled.span`
  ${subscriptRegularTypography}
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const SpanIconContainer = styled.div`
  display: flex;
`;

export const FrameItem = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding-left: 20px;
`;

export const FrameItemIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const FrameItemText = styled.span`
  ${subscriptRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.secondary};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const FrameItemLink = styled.a`
  ${subscriptRegularTypography}

  color: ${({ theme }) => theme.colors.v3.text.link};
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const LineNumber = styled.span`
  ${footnoteRegularTypography}

  margin-left: auto;
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  flex-shrink: 0;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

export const WorkspaceOnlyToggleLabel = styled.span`
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const OpenRawErrorStackTraceButton = styled(Button)`
  & > span {
    color: ${({ theme }) => theme.colors.v3.text.link};
  }
`;
