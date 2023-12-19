import styled from "styled-components";
import { IndicatorProps } from "./types";

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const Indicator = styled.div<IndicatorProps>`
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background: hsl(14deg 66% ${({ $score }) => 100 - 50 * $score}%);
`;
