import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const CopyIconComponent = (props: IconProps) => {
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
        clipPath="url(#copy-clip-1)"
      >
        <path d="M7.875 7.875h2.25v-6h-6v2.25" />
        <path d="M7.875 4.125h-6v6h6v-6Z" />
      </g>
      <defs>
        <clipPath id="copy-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CopyIcon = React.memo(CopyIconComponent);
