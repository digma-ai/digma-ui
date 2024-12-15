import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const MinusIconComponent = (props: IconProps) => {
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
        d="M10.5 6a.38.38 0 0 1-.38.38H1.88a.37.37 0 1 1 0-.75h8.25a.38.38 0 0 1 .37.37Z"
      />
    </svg>
  );
};

export const MinusIcon = React.memo(MinusIconComponent);
