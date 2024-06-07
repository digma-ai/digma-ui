import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const WrenchIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <g clipPath="url(#wrench-12px-clip-1)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.875 5.95a3 3 0 0 1 3.75-4.232L6.75 3.75l.265 1.235 1.235.265 2.032-1.875a3 3 0 0 1-4.232 3.75l-2.628 3.047a1.127 1.127 0 1 1-1.594-1.594L4.875 5.95Z"
        />
      </g>
      <defs>
        <clipPath id="wrench-12px-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const WrenchIcon = React.memo(WrenchIconComponent);
