import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const DatabaseIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 3.8c0 1-2.2 1.8-5 1.8s-5-.8-5-1.8m10 0c0-1-2.2-1.8-5-1.8s-5 .8-5 1.8m10 0v8.4c0 1-2.2 1.8-5 1.8s-5-.8-5-1.8V3.8M13 8c0 1-2.2 1.8-5 1.8S3 9 3 8"
      />
    </svg>
  );
};

export const DatabaseIcon = React.memo(DatabaseIconComponent);
