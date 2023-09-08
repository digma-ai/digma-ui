import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const DesktopIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 17"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#desktop-clip-1)"
      >
        <path d="M3 12.5h10a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1Zm7 2H6M2 10h12m-6 2.5v2" />
      </g>
      <defs>
        <clipPath id="desktop-clip-1">
          <path fill="#fff" d="M0 .5h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const DesktopIcon = React.memo(DesktopIconComponent);
