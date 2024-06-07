import styled from "styled-components";
import {
  footnoteRegularTypography,
  subscriptRegularTypography
} from "../../../../../common/App/typographies";

export const Container = styled.div`
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
