import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const LightBulbWithScrewIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 9.33c.13-.66.47-1.13 1-1.66.67-.6 1-1.47 1-2.34a4 4 0 1 0-8 0C4 6 4.13 6.8 5 7.67c.47.46.87 1 1 1.66M6 12h4m-3.33 2.67h2.66"
      />
    </svg>
  );
};

export const LightBulbWithScrewIcon = React.memo(
  LightBulbWithScrewIconComponent
);
