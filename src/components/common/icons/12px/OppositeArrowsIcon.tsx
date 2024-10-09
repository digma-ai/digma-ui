import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const OppositeArrowsIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#opposite-arrows-clip-1)"
      >
        <path d="m5 9-2 2-2-2m2-8v10m4-8 2-2 2 2m-2 8V1" />
      </g>
      <defs>
        <clipPath id="opposite-arrows-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const OppositeArrowsIcon = React.memo(OppositeArrowsIconComponent);
