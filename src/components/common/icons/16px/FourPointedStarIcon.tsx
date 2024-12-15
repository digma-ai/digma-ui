import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const FourPointedStarIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <g clipPath="url(#four-pointed-star-16px-clip-1)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9.9 10.2-1.43 3.97a.5.5 0 0 1-.94 0l-1.44-3.96a.5.5 0 0 0-.3-.3L1.83 8.47a.5.5 0 0 1 0-.94l3.96-1.44a.5.5 0 0 0 .3-.3l1.44-3.96a.5.5 0 0 1 .94 0l1.44 3.96a.5.5 0 0 0 .3.3l3.96 1.44a.5.5 0 0 1 0 .94l-3.96 1.44a.5.5 0 0 0-.3.3Z"
        />
      </g>
      <defs>
        <clipPath id="four-pointed-star-16px-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const FourPointedStarIcon = React.memo(FourPointedStarIconComponent);
