import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const MeterLowIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".95"
        d="M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".95"
        d="M15.9 11c0-2.7-2.2-4.9-4.9-4.9M7.85 7.85 11 11m-.7 0a.7.7 0 1 0 1.4 0 .7.7 0 0 0-1.4 0Z"
      />
    </svg>
  );
};

export const MeterLowIcon = React.memo(MeterLowIconComponent);
