import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const CrossIconComponent = (props: IconProps) => {
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
        clipPath="url(#cross-12px-clip-1)"
      >
        <path d="m9.375 2.625-6.75 6.75m6.75 0-6.75-6.75" />
      </g>
      <defs>
        <clipPath id="cross-12px-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CrossIcon = React.memo(CrossIconComponent);
