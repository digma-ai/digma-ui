import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const GearInGearIconComponent = (props: IconProps) => {
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
        clipPath="url(#a)"
      >
        <path d="M7.37 13.97c-.53 0-1.06-.32-1.22-.96a1.25 1.25 0 0 0-1.87-.77c-1.12.68-2.4-.6-1.72-1.73a1.25 1.25 0 0 0-.77-1.87C.5 8.34.5 6.52 1.79 6.21a1.25 1.25 0 0 0 .77-1.87c-.68-1.13.6-2.41 1.72-1.73.73.44 1.67.05 1.87-.77.31-1.28 2.13-1.28 2.44 0a1.25 1.25 0 0 0 1.87.77c1.12-.68 2.4.6 1.72 1.73a1.25 1.25 0 0 0 .78 1.87c.64.15.96.7.96 1.23" />
        <path d="M12.46 13.97a1.45 1.45 0 1 1 0-2.91m0 2.9a1.45 1.45 0 1 0 0-2.9m0 2.9v1.1m0-4V9.97m2.2 1.27-.94.55m-2.52 1.45-.94.55m0-2.55.94.55m2.52 1.45.95.55M5.19 7.42a2.18 2.18 0 1 0 4.36 0 2.18 2.18 0 0 0-4.36 0Z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const GearInGearIcon = React.memo(GearInGearIconComponent);
