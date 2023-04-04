import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const LightBulbIconComponent = (props: IconProps) => {
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
        d="M4.125 10.875h3.75M3.689 7.828a3.727 3.727 0 0 1-1.439-2.93c-.01-2.034 1.627-3.726 3.66-3.773a3.75 3.75 0 0 1 2.406 6.698 1.134 1.134 0 0 0-.441.896V9a.375.375 0 0 1-.375.375h-3A.375.375 0 0 1 4.125 9v-.281a1.144 1.144 0 0 0-.436-.89v0Z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.38 2.662a2.245 2.245 0 0 1 1.837 1.833"
      />
    </svg>
  );
};

export const LightBulbIcon = React.memo(LightBulbIconComponent);
