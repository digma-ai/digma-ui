import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const OpenLinkIconComponent = (props: IconProps) => {
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
        clipPath="url(#open-link-clip-1)"
      >
        <path d="m6.375 5.625 3.75-3.75m0 3v-3h-3m1.5 4.5V9.75a.375.375 0 0 1-.375.375h-6a.375.375 0 0 1-.375-.375v-6a.375.375 0 0 1 .375-.375h3.375" />
      </g>
      <defs>
        <clipPath id="open-link-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const OpenLinkIcon = React.memo(OpenLinkIconComponent);
