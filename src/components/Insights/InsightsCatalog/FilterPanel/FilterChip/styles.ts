import styled, { css } from "styled-components";
import { footnoteRegularTypography } from "../../../../common/App/typographies";
import { Chip } from "../../../../common/Chip";
import { activeStyles } from "../../../../common/Chip/styles";
import type { FilterChipComponentProps } from "./types";

export const StatCounter = styled.div`
  ${footnoteRegularTypography}

  height: 16px;
  display: flex;
  justify-content: center;
  padding: 0 4px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.v3.surface.highlight};
`;

const filterChipActiveStyles = css`
  ${activeStyles}

  & ${StatCounter} {
    background: ${({ theme }) => theme.colors.v3.surface.gray};
  }
`;

export const FilterChip = styled(Chip)<FilterChipComponentProps>`
  gap: 4px;

  ${({ $selected }) => ($selected ? filterChipActiveStyles : "")}

  &:disabled {
    background: transparent;

    & ${StatCounter} {
      color: ${({ theme }) => theme.colors.v3.text.disabled};
      background: ${({ theme }) => theme.colors.v3.surface.sidePanelHeader};
    }
  }

  &:hover:enabled {
    & ${StatCounter} {
      background: ${({ theme }) => theme.colors.v3.surface.gray};
    }
  }

  &:active:enabled {
    ${filterChipActiveStyles}
  }
`;

const criticalFilterChipActiveStyles = css`
  border: 1px solid ${({ theme }) => theme.colors.v3.status.high};
  background: ${({ theme }) => theme.colors.v3.pieChart.darkRed};

  & ${StatCounter} {
    background: ${({ theme }) => theme.colors.v3.status.high};
  }
`;

export const CriticalFilterChip = styled(FilterChip)<FilterChipComponentProps>`
  border: 1px solid ${({ theme }) => theme.colors.v3.status.backgroundHigh};
  background: ${({ theme }) => theme.colors.v3.pieChart.darkRed};

  & ${StatCounter} {
    background: ${({ theme }) => theme.colors.v3.status.high};
  }

  ${({ $selected }) => ($selected ? criticalFilterChipActiveStyles : "")}

  &:hover:enabled {
    border: 1px solid ${({ theme }) => theme.colors.v3.status.high};
    background: ${({ theme }) => theme.colors.v3.status.backgroundHigh};

    & ${StatCounter} {
      background: ${({ theme }) => theme.colors.v3.status.high};
    }
  }

  &:active:enabled {
    ${criticalFilterChipActiveStyles}
  }
`;

const unreadFilterChipActiveStyles = css`
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.brandPrimary};
  background: ${({ theme }) => theme.colors.v3.surface.brandDarkest};

  & ${StatCounter} {
    background: ${({ theme }) => theme.colors.v3.surface.brandTertiary};
  }
`;

export const UnreadFilterChip = styled(FilterChip)<FilterChipComponentProps>`
  ${({ $selected }) => ($selected ? unreadFilterChipActiveStyles : "")}

  &:hover:enabled {
    border: 1px solid ${({ theme }) => theme.colors.v3.stroke.brandPrimary};
    background: ${({ theme }) => theme.colors.v3.surface.brandDark};

    & ${StatCounter} {
      background: ${({ theme }) => theme.colors.v3.surface.brandSecondary};
    }
  }

  &:active:enabled {
    ${unreadFilterChipActiveStyles}
  }
`;
