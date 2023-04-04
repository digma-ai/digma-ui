import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const PlayIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill={color}
        fillRule="evenodd"
        d="m4 2 10 6-10 6V2Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const PlayIcon = React.memo(PlayIconComponent);
