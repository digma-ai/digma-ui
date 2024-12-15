import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const GlobeIconComponent = (props: IconProps) => {
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
        clipPath="url(#globe-16px-clip-1)"
      >
        <path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z" />
        <path d="M5.5 8c0 2.341.833 4.433 2.143 5.843a.485.485 0 0 0 .715 0C9.666 12.433 10.5 10.341 10.5 8s-.833-4.432-2.143-5.843a.486.486 0 0 0-.714 0C6.332 3.567 5.5 5.659 5.5 8ZM2.341 6H13.66M2.341 10H13.66" />
      </g>
      <defs>
        <clipPath id="globe-16px-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const GlobeIcon = React.memo(GlobeIconComponent);
