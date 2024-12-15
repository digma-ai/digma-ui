import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const ArrowToTopIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.003 6.708v11.625M5 11.667l5-5 5 5M5 3.333h10"
      />
    </svg>
  );
};

export const ArrowToTopIcon = React.memo(ArrowToTopIconComponent);
