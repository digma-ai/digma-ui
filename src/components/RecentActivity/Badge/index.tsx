import React from "react";
import * as s from "./styles";
import { BadgeProps } from "./types";

const BadgeComponent = (props: BadgeProps) => {
  const size = props.size || "small";

  return (
    <s.Badge
      $backgroundColor={props.backgroundColor}
      $borderColor={props.borderColor}
      $size={size}
    />
  );
};

export const Badge = React.memo(BadgeComponent);
