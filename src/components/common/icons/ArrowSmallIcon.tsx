import React from "react";
import { useIconProps } from "./hooks";
import type { RotatableIconProps } from "./types";
import { Direction } from "./types";

const directionRotateMap: Record<Direction, string> = {
  [Direction.UP]: "-90",
  [Direction.LEFT]: "180",
  [Direction.RIGHT]: "0",
  [Direction.DOWN]: "90"
};

const ArrowSmallIconComponent = (props: RotatableIconProps) => {
  const { size, color } = useIconProps(props);
  const transform = {
    transform: `rotate(${directionRotateMap[props.direction ?? Direction.UP]})`
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 13"
      {...transform}
    >
      <path
        fill={color}
        d="M10.39 6.27 7.015 9.645a.375.375 0 1 1-.53-.53L9.22 6.38H1.875a.375.375 0 1 1 0-.75H9.22L6.485 2.895a.375.375 0 1 1 .53-.53L10.39 5.74a.375.375 0 0 1 0 .53Z"
      />
    </svg>
  );
};

export const ArrowSmallIcon = React.memo(ArrowSmallIconComponent);
