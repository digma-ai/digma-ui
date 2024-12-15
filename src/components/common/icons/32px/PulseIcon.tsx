import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const PulseIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M29.333 16.001H24l-4 13.334-8-26.667-4 13.333H2.667"
      />
    </svg>
  );
};

export const PulseIcon = React.memo(PulseIconComponent);
