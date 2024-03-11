import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const HammerIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#hammer-clip-1)"
      >
        <path d="m6.75 7.25 2 2m5.5-3-2.5 2.5M2.5 4l.86-.89a5.5 5.5 0 0 1 7.78 0l4.21 4.24a.5.5 0 0 1 0 .71l-1.79 1.8a.5.5 0 0 1-.7 0L10.5 7.5l-6.35 6.35a.5.5 0 0 1-.71 0l-1.3-1.29a.5.5 0 0 1 0-.7L8.5 5.5 4.99 1.99" />
      </g>
      <defs>
        <clipPath id="hammer-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const HammerIcon = React.memo(HammerIconComponent);
