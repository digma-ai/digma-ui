import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const MagnifierIconComponent = (props: IconProps) => {
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
        fill={color}
        d="M10.765 10.235 8.418 7.888a4.13 4.13 0 1 0-.53.53l2.347 2.347a.375.375 0 1 0 .53-.53ZM1.875 5.25a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0Z"
      />
    </svg>
  );
};

export const MagnifierIcon = React.memo(MagnifierIconComponent);
