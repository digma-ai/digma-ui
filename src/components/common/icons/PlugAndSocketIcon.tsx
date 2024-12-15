import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const PlugAndSocketIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 21"
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#plug-and-socket-clip-1)"
      >
        <path d="m11.25 12.219-1.875 1.875M8.75 9.719l-1.875 1.875M5 9.719l6.25 6.25m-6.714.461-2.661 2.66m8.438-4.059-2.266 2.266a1.875 1.875 0 0 1-2.652 0L3.672 15.57a1.875 1.875 0 0 1 0-2.65l2.266-2.265M8.75 5.969l6.25 6.25m.464-6.714 2.661-2.661m-4.062 8.438 2.265-2.265a1.875 1.875 0 0 0 0-2.652l-1.726-1.723a1.875 1.875 0 0 0-2.649 0L9.688 6.907" />
      </g>
      <defs>
        <clipPath id="plug-and-socket-clip-1">
          <path fill="#fff" d="M0 .969h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const PlugAndSocketIcon = React.memo(PlugAndSocketIconComponent);
