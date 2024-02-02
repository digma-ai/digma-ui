import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const SparkleIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m7.79 11.99-2.422-.89a.372.372 0 0 1 0-.696l2.421-.891a.37.37 0 0 0 .22-.22l.89-2.421a.371.371 0 0 1 .697 0l.891 2.421a.37.37 0 0 0 .22.22l2.421.89a.372.372 0 0 1 0 .697l-2.421.89a.37.37 0 0 0-.22.22l-.89 2.422a.371.371 0 0 1-.697 0l-.89-2.421a.369.369 0 0 0-.22-.22Zm4.46-7.24V7m2.25.375v1.5m-3.375-3h2.25m.375 2.25h1.5"
      />
    </svg>
  );
};

export const SparkleIcon = React.memo(SparkleIconComponent);
