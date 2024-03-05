import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const ArrowsClockwiseIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#arrows-clockwise-1)"
      >
        <path d="M4 4s1.5-1.5 4-1.5c3.5 0 5.5 3.5 5.5 3.5M12 12s-1.5 1.5-4 1.5c-3.5 0-5.5-3.5-5.5-3.5" />
        <path d="M10.5 6h3V3m-8 7h-3v3" />
      </g>
      <defs>
        <clipPath id="arrows-clockwise-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ArrowsClockwiseIcon = React.memo(ArrowsClockwiseIconComponent);
