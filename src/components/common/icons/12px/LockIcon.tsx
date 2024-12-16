import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const LockIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 10 12"
      fill="none"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.714 5V3.286a2.286 2.286 0 1 1 4.572 0V5"
      />
      <rect width="8" height="5.714" x="1" y="5" stroke={color} rx="2" />
    </svg>
  );
};

export const LockIcon = React.memo(LockIconComponent);
