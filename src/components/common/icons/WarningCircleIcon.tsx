import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const WarningCircleIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth=".82"
        d="M11 7.73v4.47m0 1.8v.22M17 11a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z"
      />
    </svg>
  );
};

export const WarningCircleIcon = React.memo(WarningCircleIconComponent);
