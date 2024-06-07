import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const PlusIconComponent = (props: IconProps) => {
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
        clipPath="url(#plus-12px-clip-1)"
      >
        <path d="M1.875 6h8.25M6 1.875v8.25" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const PlusIcon = React.memo(PlusIconComponent);
