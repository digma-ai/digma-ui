import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

export const ThreeDotsVerticalIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <g fill={color} clipPath="url(#kebab-20px-clip-1)">
        <path d="M10 10.938a.937.937 0 1 0 0-1.875.937.937 0 0 0 0 1.874Zm0-5.313a.937.937 0 1 0 0-1.875.937.937 0 0 0 0 1.875Zm0 10.625a.937.937 0 1 0 0-1.875.937.937 0 0 0 0 1.875Z" />
      </g>
      <defs>
        <clipPath id="kebab-20px-clip-1">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ThreeDotsVerticalIcon = React.memo(ThreeDotsVerticalIconComponent);
