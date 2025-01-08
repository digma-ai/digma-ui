import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const ArrowDownToRightIconComponent = (props: IconProps) => {
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
        strokeMiterlimit="10"
        d="m9 7 2 2-2 2"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M2 1v6.37C2 8.27 2.716 9 3.6 9h6.9"
      />
    </svg>
  );
};

export const ArrowDownToRightIcon = React.memo(ArrowDownToRightIconComponent);
