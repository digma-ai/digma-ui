import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const SpotIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.7 5a6.01 6.01 0 0 1 5.14 5.38M10.14 5A6.01 6.01 0 0 0 5 10.38m5.13 6.72A6.01 6.01 0 0 1 5 11.72m6.7 5.38a6.01 6.01 0 0 0 5.14-5.38m-5.89 1.58a2.37 2.37 0 1 0 0-4.74 2.37 2.37 0 0 0 0 4.74Z"
      />
    </svg>
  );
};

export const SpotIcon = React.memo(SpotIconComponent);
