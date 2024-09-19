import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const SortIconComponent = (props: IconProps) => {
  const { color, size } = useIconProps(props);

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#a)"
      >
        <path d="M3 8h4.5M3 4h8.5M3 12h3.5M9 10.5l2.5 2.5 2.5-2.5M11.5 13V7" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const SortIcon = React.memo(SortIconComponent);
