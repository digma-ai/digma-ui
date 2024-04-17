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
      viewBox="0 0 16 16"
    >
      <g clipPath="url(#wrench-clip-1)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.5 7.93a4 4 0 0 1 5-5.64L9 5l.35 1.65L11 7l2.71-2.5a4 4 0 0 1-5.64 5l-3.5 4.06a1.5 1.5 0 1 1-2.13-2.12l4.06-3.5Z"
        />
      </g>
      <defs>
        <clipPath id="wrench-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const WrenchIcon = React.memo(WrenchIconComponent);
