import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const RecheckIconComponent = (props: IconProps) => {
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
        clipPath="url(#recheck-16px-clip-1)"
      >
        <path d="M12.5 5.5 14 4l-1.5-1.5" />
        <path d="M2 8a4 4 0 0 1 4-4h8M3.5 10.5 2 12l1.5 1.5" />
        <path d="M14 8a4 4 0 0 1-4 4H2" />
      </g>
      <defs>
        <clipPath id="recheck-16px-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const RecheckIcon = React.memo(RecheckIconComponent);
