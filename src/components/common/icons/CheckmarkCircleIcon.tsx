import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const CheckmarkCircleIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <path fill={color} d="M6 12A6 6 0 1 0 6 0a6 6 0 0 0 0 12Z" />
      <path
        stroke="#5A5A5A"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.75 4.5 5.08 8 3.25 6.25"
      />
    </svg>
  );
};

export const CheckmarkCircleIcon = React.memo(CheckmarkCircleIconComponent);
