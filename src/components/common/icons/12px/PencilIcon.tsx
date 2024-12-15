import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const PencilIconComponent = (props: IconProps) => {
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
        d="M10.655 3.44 8.561 1.343a.75.75 0 0 0-1.061 0L1.72 7.125a.743.743 0 0 0-.22.53V9.75a.75.75 0 0 0 .75.75h2.095a.744.744 0 0 0 .53-.22l5.78-5.78a.75.75 0 0 0 0-1.06Zm-6.31 6.31H2.25V7.655L6.375 3.53 8.47 5.625 4.345 9.75ZM9 5.094 6.905 3 8.03 1.875l2.095 2.094L9 5.094Z"
      />
    </svg>
  );
};

export const PencilIcon = React.memo(PencilIconComponent);
