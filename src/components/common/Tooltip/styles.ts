import styled from "styled-components";
import { LAYERS } from "../App/styles";

export const TooltipContainer = styled.div`
  padding: 4px;
  border-radius: 4px;
  box-shadow: 0 0 6px 0 rgb(0 0 0 / 15%);
  font-size: 14px;
  word-break: break-all;
  z-index: ${LAYERS.TOOLTIP};
  color: ${({ theme }) => theme.colors.tooltip.text};
  background: ${({ theme }) => theme.colors.tooltip.background};
`;
