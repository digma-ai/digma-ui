import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const PlusIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 16 16">
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#plus-16px-clip-1)"
      >
        <path d="M2.5 8h11M8 2.5v11" />
      </g>
      <defs>
        <clipPath id="plus-16px-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const PlusIcon = React.memo(PlusIconComponent);
