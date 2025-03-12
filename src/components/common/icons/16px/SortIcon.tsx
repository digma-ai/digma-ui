import React from "react";
import { useIconProps } from "../hooks";
import type { RotatableIconProps } from "../types";
import { Direction } from "../types";

const directionRotateMap: Record<Direction, string> = {
  [Direction.Down]: "0",
  [Direction.Left]: "0",
  [Direction.Right]: "0",
  [Direction.Up]: "180"
};

const SortIconComponent = (props: RotatableIconProps) => {
  const { color, size } = useIconProps(props);

  const transform = {
    transform: `rotate(${
      directionRotateMap[props.direction ?? Direction.Down]
    })`
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      {...transform}
    >
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#sort-clip-1)"
      >
        <path d="M3 8h4.5M3 4h8.5M3 12h3.5M9 10.5l2.5 2.5 2.5-2.5M11.5 13V7" />
      </g>
      <defs>
        <clipPath id="sort-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const SortIcon = React.memo(SortIconComponent);
