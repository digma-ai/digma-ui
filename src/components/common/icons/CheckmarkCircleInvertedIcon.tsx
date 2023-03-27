import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const CheckmarkCircleInvertedIconComponent = (props: IconProps) => {
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
        d="M6 10.5C8.48528 10.5 10.5 8.48528 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5C3.51472 1.5 1.5 3.51472 1.5 6C1.5 8.48528 3.51472 10.5 6 10.5Z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.125 5.88614L5.59969 7.5L8.25 4.5"
      />
    </svg>
  );
};

export const CheckmarkCircleInvertedIcon = React.memo(
  CheckmarkCircleInvertedIconComponent
);
