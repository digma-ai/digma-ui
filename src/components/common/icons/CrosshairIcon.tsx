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
        d="M10 6a4 4 0 0 1-4 4m4-4a4 4 0 0 0-4-4m4 4H7.87M6 10a4 4 0 0 1-4-4m4 4V7.88M2 6a4 4 0 0 1 4-4M2 6h2.13M6 2v2.13"
      />
    </svg>
  );
};

export const CrosshairIcon = React.memo(CrosshairIconComponent);
