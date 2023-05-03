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
        d="M14.53 7.16 5.52 1.65A1 1 0 0 0 4 2.49v11.02a1 1 0 0 0 1.52.84l9-5.5a.99.99 0 0 0 0-1.7ZM5 13.5v-11L13.99 8 5 13.5Z"
      />
    </svg>
  );
};

export const PlayIcon = React.memo(PlayIconComponent);
