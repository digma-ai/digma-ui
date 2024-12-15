import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

const PaperclipIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <g clipPath="url(#paperclip-12px-clip-1)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 3.75 3.5948 7.7198a.75.75 0 0 0 1.0608 1.0603l4.6552-4.7193a1.5002 1.5002 0 1 0-2.1216-2.1216L2.5341 6.659a2.25 2.25 0 0 0 3.1818 3.182L9.5625 6"
        />
      </g>
      <defs>
        <clipPath id="paperclip-12px-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const PaperclipIcon = React.memo(PaperclipIconComponent);
