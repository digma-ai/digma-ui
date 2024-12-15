import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const CheckmarkCircleInvertedIconComponent = (props: IconProps) => {
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
        fill={color}
        stroke={color}
        strokeWidth=".2"
        d="m11.4 4.6-5.08 6.17-2.27-2.7a.45.45 0 0 0-.34-.17.45.45 0 0 0-.34.17.6.6 0 0 0-.14.37c0 .14.05.28.14.38l2.6 3.11c.05.06.1.1.16.13a.42.42 0 0 0 .38 0 .48.48 0 0 0 .15-.13l5.42-6.57a.6.6 0 0 0 .13-.38.6.6 0 0 0-.13-.38.45.45 0 0 0-.34-.16.45.45 0 0 0-.34.16Z"
      />
      <rect width="15" height="15" x=".5" y=".5" stroke={color} rx="7.5" />
    </svg>
  );
};

export const CheckmarkCircleInvertedIcon = React.memo(
  CheckmarkCircleInvertedIconComponent
);
