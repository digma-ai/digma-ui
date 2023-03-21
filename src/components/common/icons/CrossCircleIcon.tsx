import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const CrossCircleIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 9 10"
    >
      <path
        fill={color}
        d="M4.5 9.5C6.98528 9.5 9 7.48528 9 5C9 2.51472 6.98528 0.5 4.5 0.5C2.01472 0.5 0 2.51472 0 5C0 7.48528 2.01472 9.5 4.5 9.5Z"
      />
      <path
        stroke="#5A5A5A"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 6.5 6 3.5M6 6.5 3 3.5"
      />
    </svg>
  );
};

export const CrossCircleIcon = React.memo(CrossCircleIconComponent);
