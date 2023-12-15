import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const CodeIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <g clipPath="url(#infinity-clip-1)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m6.664 9.508-.543.613a3 3 0 1 1 0-4.242L9.88 10.12a3 3 0 1 0 0-4.242l-.543.613"
        />
      </g>
      <defs>
        <clipPath id="infinity-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CodeIcon = React.memo(CodeIconComponent);
