import React from "react";
import { useIconProps } from "./hooks";
import type { RotatableIconProps } from "./types";
import { Direction } from "./types";

const directionRotateMap: Record<Direction, string> = {
  [Direction.Down]: "0",
  [Direction.Left]: "90",
  [Direction.Up]: "180",
  [Direction.Right]: "270"
};

const DoubleChevronIconComponent = (props: RotatableIconProps) => {
  const { size, color } = useIconProps(props);

  const transform = {
    transform: `rotate(${
      directionRotateMap[props.direction ?? Direction.Down]
    })`
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
      {...transform}
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#double-chevron-clip-1)"
      >
        <path d="M9.375 2.25 5.625 6l-3.75-3.75M9.375 6l-3.75 3.75L1.875 6" />
      </g>
      <defs>
        <clipPath id="double-chevron-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const DoubleChevronIcon = React.memo(DoubleChevronIconComponent);
