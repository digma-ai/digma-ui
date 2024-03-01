import styled from "styled-components";
import { LAYERS } from "../../App/styles";
import { footnoteRegularTypography } from "../../App/typographies";
import { TooltipComponentProps } from "./types";

export const TooltipContainer = styled.div`
  z-index: ${LAYERS.TOOLTIP};
`;

export const Tooltip = styled.div<TooltipComponentProps>`
  ${footnoteRegularTypography}

  padding: 4px;
  border-radius: 4px;
  box-shadow: 0 0 6px 0 rgb(0 0 0 / 15%);
  word-break: keep-all;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  background: ${({ theme }) => theme.colors.v3.surface.primary};
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  ${({ $fullWidth }) => ($fullWidth ? "" : "max-width: 200px;")}
`;
