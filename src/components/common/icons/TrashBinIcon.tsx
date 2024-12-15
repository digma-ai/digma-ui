import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const TrashBinIconComponent = (props: IconProps) => {
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
        clipPath="url(#trash-bin-clip-1)"
      >
        <path d="M10.125 2.625h-8.25m3 2.25v3m2.25-3v3m2.25-5.25V9.75a.375.375 0 0 1-.375.375H3a.375.375 0 0 1-.375-.375V2.625m5.25 0v-.75a.75.75 0 0 0-.75-.75h-2.25a.75.75 0 0 0-.75.75v.75" />
      </g>
      <defs>
        <clipPath id="trash-bin-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const TrashBinIcon = React.memo(TrashBinIconComponent);
