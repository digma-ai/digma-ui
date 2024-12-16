import React from "react";
import { useIconProps } from "./hooks";
import type { RotatableIconProps } from "./types";
import { Direction } from "./types";

const directionRotateMap: Record<Direction, string> = {
  [Direction.UP]: "180",
  [Direction.LEFT]: "90",
  [Direction.RIGHT]: "-90",
  [Direction.DOWN]: "0"
};

const ArrowDashedLineIconComponent = (props: RotatableIconProps) => {
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
      viewBox="0 0 6 13"
      {...transform}
    >
      <path
        fill={color}
        d="m3 13 2.89-5H.1L3 13Zm.5-3.25V7.58h-1v2.17h1Zm0-4.33V3.25h-1v2.17h1Zm0-4.34V0h-1v1.08h1Z"
      />
    </svg>
  );
};

export const ArrowDashedLineIcon = React.memo(ArrowDashedLineIconComponent);
