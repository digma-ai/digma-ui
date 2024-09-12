import React from "react";
import * as s from "./styles";
import { BadgeProps } from "./types";

const BadgeComponent = ({ size = "small", className }: BadgeProps) => (
  <s.Badge className={className} $size={size} />
);

export const Badge = React.memo(BadgeComponent);
