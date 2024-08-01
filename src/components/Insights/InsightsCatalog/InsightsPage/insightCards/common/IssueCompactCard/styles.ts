import styled, { css } from "styled-components";
import { bodyBoldTypography } from "../../../../../../common/App/typographies";
import { CopyButton } from "../../../../../../common/v3/CopyButton";
import { Tag } from "../../../../../../common/v3/Tag";
import { Popup } from "../../../../../../Navigation/common/Popup";
import { ContainerProps } from "./types";

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 4px;
  padding: 12px;
  height: 72px;
  box-sizing: border-box;

  ${({ $isCritical, $isRead, theme }) => {
    if ($isCritical) {
      if ($isRead) {
        return css`
          background: ${theme.colors.v3.pieChart.darkRed};
        `;
      }

      return css`
        border: 1px solid ${theme.colors.v3.status.backgroundHigh};
        background: ${theme.colors.v3.pieChart.brightRedStroke};
        padding: 11px;
      `;
    }

    if ($isRead) {
      return css`
        background: ${theme.colors.v3.surface.secondary};
      `;
    }

    return css`
      border: 1px solid ${theme.colors.v3.stroke.primary};
      background: ${theme.colors.v3.surface.brandDarkest};
      padding: 11px;
    `;
  }}
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.span`
  ${bodyBoldTypography}

  flex-grow: 1;
  padding: 0 4px 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const MetricTag = styled(Tag)`
  margin-left: 4px;
`;

export const StyledCopyButton = styled(CopyButton)`
  padding: 0 6px;
  display: none;
`;

export const SpanInfoRow = styled.div`
  display: flex;
  padding: 0 32px;
  gap: 4px;
  align-items: center;

  &:hover {
    ${StyledCopyButton} {
      display: flex;
    }
  }
`;

export const StyledPopup = styled(Popup)`
  & > div {
    padding: 8px 4px;
  }
`;
