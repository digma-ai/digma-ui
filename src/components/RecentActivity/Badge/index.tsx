import React from "react";
import * as s from "./styles";
import { BadgeProps } from "./types";

const BadgeComponent = ({
  size = "small",
  backgroundColor,
  borderColor
}: BadgeProps) => (
  <s.Badge
    $backgroundColor={backgroundColor}
    $borderColor={borderColor}
    $size={size}
  />
);

export const Badge = React.memo(BadgeComponent);
