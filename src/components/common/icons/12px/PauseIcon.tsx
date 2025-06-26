import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const PauseIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 12 12"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.68 1h-.84a.85.85 0 0 0-.6.24.83.83 0 0 0-.24.6v8.33a.85.85 0 0 0 .84.83h.84a.83.83 0 0 0 .84-.83V1.83a.83.83 0 0 0-.24-.59.85.85 0 0 0-.6-.24Zm5.48 0h-.84a.85.85 0 0 0-.6.24.83.83 0 0 0-.25.6v8.33a.85.85 0 0 0 .84.83h.85a.9.9 0 0 0 .6-.24.83.83 0 0 0 .24-.6V1.84a.83.83 0 0 0-.25-.59.85.85 0 0 0-.6-.24Z"
      />
    </svg>
  );
};

export const PauseIcon = React.memo(PauseIconComponent);
