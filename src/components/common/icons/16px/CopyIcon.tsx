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
      viewBox="0 0 16 16"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#copy-clip-1)"
      >
        <path d="M10.5 10.5h3v-8h-8v3" />
        <path d="M10.5 5.5h-8v8h8v-8Z" />
      </g>
      <defs>
        <clipPath id="copy-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CopyIcon = React.memo(CopyIconComponent);
