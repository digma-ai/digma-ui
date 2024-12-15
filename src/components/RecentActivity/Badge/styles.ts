import styled from "styled-components";
import type { BadgeElementProps, BadgeSize } from "./types";

const getDimensions = (size: BadgeSize) => {
  switch (size) {
    case "small":
      return 8;
    case "large":
      return 10;
  }
};

export const Badge = styled.div<BadgeElementProps>`
  box-sizing: border-box;
  height: ${({ $size }) => getDimensions($size)}px;
  width: ${({ $size }) => getDimensions($size)}px;
  border-radius: 2px;
  border: 2px solid ${({ theme }) => theme.colors.v3.surface.secondary};
  background: ${({ theme }) => theme.colors.v3.status.success};
`;
