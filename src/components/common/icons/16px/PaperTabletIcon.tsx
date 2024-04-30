import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const PaperTabletIconComponent = (props: IconProps) => {
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
        clipPath="url(#paper-tablet-clip-1)"
      >
        <path d="M6 9.5h4m-4-2h4m0-5h2.5a.5.5 0 0 1 .5.5v10.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5H6" />
        <path d="M5.5 4.5V4a2.5 2.5 0 1 1 5 0v.5h-5Z" />
      </g>
      <defs>
        <clipPath id="paper-tablet-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const PaperTabletIcon = React.memo(PaperTabletIconComponent);
