import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const RefreshIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <g stroke={color} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3.556 3.557S5.222 1.891 8 1.891c3.889 0 6.111 3.889 6.111 3.889m-1.667 6.665S10.778 14.11 8 14.11c-3.889 0-6.111-3.888-6.111-3.888" />
        <path d="M10.778 5.779h3.333V2.445m-8.889 7.778H1.89v3.333" />
      </g>
    </svg>
  );
};

export const RefreshIcon = React.memo(RefreshIconComponent);
