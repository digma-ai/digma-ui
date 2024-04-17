import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const TrashBinIconComponent = (props: IconProps) => {
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
        clipPath="url(#trash-bin-clip-1)"
      >
        <path d="M13.5 3.5h-11m4 3v4m3-4v4m3-7V13a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5V3.5m7 0v-1a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v1" />
      </g>
      <defs>
        <clipPath id="trash-bin-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const TrashBinIcon = React.memo(TrashBinIconComponent);
