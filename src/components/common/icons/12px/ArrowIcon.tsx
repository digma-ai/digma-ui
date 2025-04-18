import React from "react";
import { useIconProps } from "../hooks";
import type { RotatableIconProps } from "../types";
import { Direction } from "../types";

const directionRotateMap: Record<Direction, string> = {
  [Direction.Down]: "0",
  [Direction.Left]: "90",
  [Direction.Up]: "180",
  [Direction.Right]: "270"
};

const ArrowIconComponent = (props: RotatableIconProps) => {
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
        clipPath="url(#arrow-12px-clip-1)"
      >
        <path d="M6 1.76v8.48M9.45 6.8 6 10.24 2.55 6.8" />
      </g>
      <defs>
        <clipPath id="arrow-12px-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ArrowIcon = React.memo(ArrowIconComponent);
