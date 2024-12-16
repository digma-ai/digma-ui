import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const CheckmarkIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
        d="m1.5 6.048 2.89 2.738L10.5 3"
      />
    </svg>
  );
};

export const CheckmarkIcon = React.memo(CheckmarkIconComponent);
