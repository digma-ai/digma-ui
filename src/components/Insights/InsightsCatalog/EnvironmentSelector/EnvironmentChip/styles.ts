import styled, { css } from "styled-components";
import { Chip } from "../../../../common/Chip";
import { activeStyles } from "../../../../common/Chip/styles";
import { StyledChipProps } from "./types";
export const StyledChip = styled(Chip)<StyledChipProps>`
  gap: 4px;

  ${({ isActive }) => (isActive ? activeStyles : "")}
  ${({ isActive }) =>
    isActive
      ? css`
          cursor: initial;
        `
      : ""}
`;

export const IconContainer = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.v3.icon.secondary};
  opacity: 0.5;
`;

export const Name = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
