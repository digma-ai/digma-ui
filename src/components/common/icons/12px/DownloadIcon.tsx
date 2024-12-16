import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const DownloadIconComponent = (props: IconProps) => {
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
        clipPath="url(#download-12px-clip-1)"
      >
        <path d="M6 7.125v-5.25m4.125 5.25V9.75a.375.375 0 0 1-.375.375h-7.5a.375.375 0 0 1-.375-.375V7.125" />
        <path d="M7.875 5.25 6 7.125 4.125 5.25" />
      </g>
      <defs>
        <clipPath id="download-12px-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const DownloadIcon = React.memo(DownloadIconComponent);
