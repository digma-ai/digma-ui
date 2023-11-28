import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const FilterIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 8 9"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 4.5h4m-5.25-2h6.5m-4 4h1.5"
      />
    </svg>
  );
};

export const FilterIcon = React.memo(FilterIconComponent);
