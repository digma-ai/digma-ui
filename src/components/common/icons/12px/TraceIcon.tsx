import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const TraceIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        d="M6 10.5A4.5 4.5 0 1 0 1.5 6"
      />
      <path fill={color} d="M7 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M.5 9.21h3.92m-1.768 1.767L4.419 9.21 2.652 7.442"
      />
    </svg>
  );
};

export const TraceIcon = React.memo(TraceIconComponent);
