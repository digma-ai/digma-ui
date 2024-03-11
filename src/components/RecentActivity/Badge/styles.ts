import styled from "styled-components";
import { grayScale } from "../../common/App/v2colors";
import { BadgeElementProps, BadgeSize } from "./types";

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
  background: ${({ $backgroundColor }) => $backgroundColor || grayScale[200]};
  border: 2px solid ${({ $borderColor }) => $borderColor || grayScale[850]};
`;
