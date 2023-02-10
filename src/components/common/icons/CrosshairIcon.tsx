import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const CrosshairIconComponent = (props: IconProps) => {
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
        d="M10 6H8.4M3.6 6H2m4-2.4V2m0 8V8.4M9.2 6a3.2 3.2 0 1 1-6.4 0 3.2 3.2 0 0 1 6.4 0Z"
      />
    </svg>
  );
};

export const CrosshairIcon = React.memo(CrosshairIconComponent);
