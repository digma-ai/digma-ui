import styled from "styled-components";
import { LAYERS } from "../../App/styles";

export const TooltipContainer = styled.div`
  z-index: ${LAYERS.TOOLTIP};
`;

export const Tooltip = styled.div`
  padding: 4px;
  border-radius: 4px;
  box-shadow: 0 0 6px 0 rgb(0 0 0 / 15%);
  font-size: 14px;
  word-break: break-all;
  color: ${({ theme }) => theme.colors.v3.text.primary};
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
`;
