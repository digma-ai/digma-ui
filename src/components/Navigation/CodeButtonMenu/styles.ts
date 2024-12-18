import styled from "styled-components";
import type { LinkProps } from "./types";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 322px;
  gap: 4px;
`;

export const CodeLocation = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  gap: 4px;
  align-items: center;
  font-size: 14px;
`;

export const CodeLocationName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CodeIconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.tertiary};
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const Text = styled.div`
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const Link = styled.a<LinkProps>`
  color: ${({ theme, $isDisabled }) =>
    $isDisabled ? theme.colors.v3.text.disabled : theme.colors.v3.text.link};
  text-decoration: none;
  cursor: ${({ $isDisabled }) => ($isDisabled ? "initial" : "pointer")};
`;

export const AddObservabilityButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
`;

export const MissingDependencyContainer = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.stroke.primary};
  background: ${({ theme }) => theme.colors.v3.surface.brandDark};
`;

export const MissingDependencyText = styled.div`
  color: ${({ theme }) => theme.colors.v3.status.high};
`;
