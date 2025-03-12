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

const ChevronIconComponent = (props: RotatableIconProps) => {
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
      viewBox="0 0 20 20"
      {...transform}
    >
      <path
        stroke={color}
        strokeLinecap="square"
        strokeLinejoin="round"
        d="m5 7.5 5 5 5-5"
      />
    </svg>
  );
};

export const ChevronIcon = React.memo(ChevronIconComponent);
