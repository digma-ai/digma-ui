import styled, { css } from "styled-components";
import {
  subheading1RegularTypography,
  subscriptRegularTypography
} from "../../../../common/App/typographies";
import { Link } from "../../../../common/v3/Link";
import type { ToolNameProps } from "./types";

export const HumanMessage = styled.div`
  background: ${({ theme }) => theme.colors.v3.surface.highlight};
  padding: 8px;
  border-radius: 8px;
  align-self: flex-end;
`;

export const AgentMessage = styled.div`
  ${subheading1RegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const StyledLink = styled(Link)`
  font-size: inherit;
`;

export const MemoryUpdateMessage = styled.div`
  ${subscriptRegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ToolName = styled.span<ToolNameProps>`
  ${({ theme, $status }) => {
    return $status === "error"
      ? css`
          color: ${theme.colors.v3.status.high};
        `
      : null;
  }}
`;
