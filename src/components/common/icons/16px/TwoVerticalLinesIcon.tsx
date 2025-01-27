import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const TwoVerticalLinesIconComponent = (props: IconProps) => {
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
        d="M5.33 1.33v13.34m5.34-13.34v13.34"
      />
    </svg>
  );
};

export const TwoVerticalLinesIcon = React.memo(TwoVerticalLinesIconComponent);
