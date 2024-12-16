import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const EndpointIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.75 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      />
      <path
        fill={color}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8h3.5"
      />
    </svg>
  );
};

export const EndpointIcon = React.memo(EndpointIconComponent);
