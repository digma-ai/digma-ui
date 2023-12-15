import styled from "styled-components";
import { ContainerProps, IconTagSize } from "./types";

const getDimensions = (size: IconTagSize) => (size === "large" ? 28 : 20); //in pixels

export const Container = styled.div<ContainerProps>`
  display: flex;
  height: ${({ $size }) => getDimensions($size)}px;
  width: ${({ $size }) => getDimensions($size)}px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.iconTag.border};
  background: ${({ theme }) => theme.colors.iconTag.background};
  color: ${({ theme }) => theme.colors.iconTag.icon};
`;
