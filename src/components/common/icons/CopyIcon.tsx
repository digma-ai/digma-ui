import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const CopyIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.125 8.625v-6.75h-6.75"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 3.375h-6.75v6.75h6.75v-6.75Z"
      />
    </svg>
  );
};

export const CopyIcon = React.memo(CopyIconComponent);
