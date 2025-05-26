<svg
  xmlns="http://www.w3.org/2000/svg"
  width="12"
  height="12"
  fill="none"
  viewBox="0 0 12 12"
></svg>;

import React from "react";
import { useIconProps } from "../hooks";
import { Direction, type RotatableIconProps } from "../types";

const directionRotateMap: Record<Direction, string> = {
  [Direction.Right]: "0",
  [Direction.Down]: "90",
  [Direction.Left]: "180",
  [Direction.Up]: "270"
};

const RoundedTriangleIconComponent = (props: RotatableIconProps) => {
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
      <path
        fill={color}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.422 4.211c1.474.737 1.474 2.84 0 3.578l-5.528 2.764A2 2 0 0 1 1 8.763V3.237a2 2 0 0 1 2.894-1.789l5.528 2.764Z"
      />
    </svg>
  );
};

export const RoundedTriangleIcon = React.memo(RoundedTriangleIconComponent);
