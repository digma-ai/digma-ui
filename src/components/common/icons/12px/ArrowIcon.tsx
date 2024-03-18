import React from "react";
import { useIconProps } from "../hooks";
import { Direction, RotatableIconProps } from "../types";

const directionRotateMap: { [key in Direction]: string } = {
  [Direction.DOWN]: "0",
  [Direction.LEFT]: "90",
  [Direction.UP]: "180",
  [Direction.RIGHT]: "270"
};

const ArrowIconComponent = (props: RotatableIconProps) => {
  const { size, color } = useIconProps(props);

  const transform = {
    transform: `rotate(${
      directionRotateMap[props.direction || Direction.DOWN]
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
        clipPath="url(#arrow-clip-1)"
      >
        <path d="M6 1.76v8.48M9.45 6.8 6 10.24 2.55 6.8" />
      </g>
      <defs>
        <clipPath id="arrow-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ArrowIcon = React.memo(ArrowIconComponent);
