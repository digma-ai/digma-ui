import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const CrossIconComponent = (props: IconProps) => {
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
        d="M12.854 12.146a.5.5 0 0 1-.708.708L8 8.707l-4.146 4.147a.5.5 0 1 1-.708-.707L7.293 8 3.146 3.854a.5.5 0 0 1 .708-.707L8 7.293l4.146-4.146a.5.5 0 1 1 .708.707L8.707 8l4.147 4.146Z"
      />
    </svg>
  );
};

export const CrossIcon = React.memo(CrossIconComponent);
