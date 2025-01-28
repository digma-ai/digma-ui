import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const PulseIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1 8h3.111l2.333 6L9.556 2l2.333 6H15"
      />
    </svg>
  );
};

export const PulseIcon = React.memo(PulseIconComponent);
