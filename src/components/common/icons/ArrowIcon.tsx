import React from "react";
import { useIconProps } from "./hooks";
import type { RotatableIconProps } from "./types";
import { Direction } from "./types";

interface ArrowIconProps extends RotatableIconProps {
  dashed?: boolean;
}

const directionRotateMap: Record<Direction, string> = {
  [Direction.Up]: "0",
  [Direction.Left]: "0",
  [Direction.Right]: "0",
  [Direction.Down]: "90"
};

const ArrowIconComponent = (props: ArrowIconProps) => {
  const { size, color } = useIconProps(props);
  const transform = {
    transform: `rotate(${directionRotateMap[props.direction ?? Direction.Up]})`
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
      {...transform}
    >
      <path
        stroke={color}
        strokeDasharray={props.dashed ? "2 2" : "none"}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4 12 8-8M5.5 4H12v6.5"
      />
    </svg>
  );
};

export const ArrowIcon = React.memo(ArrowIconComponent);
