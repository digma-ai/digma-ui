import styled from "styled-components";
import type { CustomImageProps } from "./types";

export const CustomImage = styled.img<CustomImageProps>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  object-fit: contain;
`;
