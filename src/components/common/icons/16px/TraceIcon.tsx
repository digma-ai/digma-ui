import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const TraceIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path stroke={color} strokeLinecap="round" d="M8 14a6 6 0 1 0-6-6" />
      <path
        fill={color}
        d="M9.33 8a1.33 1.33 0 1 1-2.66 0 1.33 1.33 0 0 1 2.66 0Z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M.67 12.28h5.22m-2.35 2.36 2.35-2.36-2.35-2.36"
      />
    </svg>
  );
};

export const TraceIcon = React.memo(TraceIconComponent);
