import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const ScalesIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5.077v11.846m-1.615 0h3.23M6.154 8.308l9.692-2.154M4 13.692c0 1.192 1.346 1.616 2.154 1.616.808 0 2.154-.424 2.154-1.616L6.154 8.308 4 13.692Zm9.692-2.153c0 1.19 1.347 1.615 2.154 1.615.808 0 2.154-.424 2.154-1.615l-2.154-5.385-2.154 5.385Z"
      />
    </svg>
  );
};

export const ScalesIcon = React.memo(ScalesIconComponent);
