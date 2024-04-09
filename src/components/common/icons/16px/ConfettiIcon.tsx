import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const ConfettiIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <g clipPath="url(#confetti-clip-1)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m7.14 5.88 1.87-2.03c1-1.09 1.12-2.04.38-2.85m-4.5 1.75v-.39m9.33-.2v-.38m0 7.39v-.4m-1.55 4.29v-.4M9.39 8.33l1.87-2.03c1.24-1.36 2.5-1.36 3.74 0M2.03 10.16l-1.01 4.32a.4.4 0 0 0 .5.5l4.03-1.4m-3.52-3.42 3.52 3.43m-3.52-3.43.5-2.17.5-2.16a.4.4 0 0 1 .67-.14l6.04 5.87a.4.4 0 0 1-.17.63l-2.01.7-2.01.7"
        />
      </g>
      <defs>
        <clipPath id="confetti-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ConfettiIcon = React.memo(ConfettiIconComponent);
