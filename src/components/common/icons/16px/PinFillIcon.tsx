import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const PinFillIconComponent = (props: IconProps) => {
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
        clipPath="url(#pin-fill-16px-clip-1)"
      >
        <path
          fill={color}
          d="M14.35 6.15a.5.5 0 0 0 0-.71l-3.79-3.8a.5.5 0 0 0-.7 0l-3.59 3.6s-1.73-.87-3.58.63a.5.5 0 0 0-.04.74l6.74 6.74a.5.5 0 0 0 .75-.05c.52-.7 1.35-2.13.63-3.56l3.58-3.6Z"
        />
        <path d="M6.02 9.98 3 13" />
      </g>
      <defs>
        <clipPath id="pin-fill-16px-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const PinFillIcon = React.memo(PinFillIconComponent);
