import React from "react";
import { useIconProps } from "../hooks";
import { Direction, RotatableIconProps } from "../types";

const directionRotateMap: { [key in Direction]: string } = {
  [Direction.DOWN]: "0",
  [Direction.LEFT]: "90",
  [Direction.UP]: "180",
  [Direction.RIGHT]: "270"
};

const ChevronIconComponent = (props: RotatableIconProps) => {
  const { size, color } = useIconProps(props);

  const transform = {
    transform: `rotate(${
      directionRotateMap[props.direction ?? Direction.DOWN]
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
