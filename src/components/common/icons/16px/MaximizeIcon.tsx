import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const MaximizeIconComponent = (props: IconProps) => {
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
        d="M8 13.33H2.67V8M8 2.67h5.33V8"
      />
    </svg>
  );
};

export const MaximizeIcon = React.memo(MaximizeIconComponent);
