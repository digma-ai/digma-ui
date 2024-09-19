import styled from "styled-components";
import { caption2BoldTypography } from "../../../../../common/App/typographies";

export const Container = styled.div`
  width: fit-content;
  display: flex;
  gap: 4px;
  padding: 3px 8px 3px 6px;
  border-radius: 100px;
  align-items: center;
  background: ${({ theme }) =>
    `linear-gradient(0deg, ${theme.colors.v3.surface.primary} 0%, ${theme.colors.v3.surface.primary} 100%), ${theme.colors.v3.status.backgroundSuccess}`};
`;

export const Text = styled.span`
  ${caption2BoldTypography}

  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const IconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.disabled};
`;
