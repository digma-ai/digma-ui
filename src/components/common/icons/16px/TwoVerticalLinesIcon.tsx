import React from "react";
import { useIconProps } from "../hooks";
import { Direction, type RotatableIconProps } from "../types";

const directionRotateMap: Record<Direction, string> = {
  [Direction.Down]: "0",
  [Direction.Left]: "90",
  [Direction.Up]: "0",
  [Direction.Right]: "90"
};

const TwoVerticalLinesIconComponent = (props: RotatableIconProps) => {
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
      viewBox="0 0 16 16"
      {...transform}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.33 1.33v13.34m5.34-13.34v13.34"
      />
    </svg>
  );
};

export const TwoVerticalLinesIcon = React.memo(TwoVerticalLinesIconComponent);
