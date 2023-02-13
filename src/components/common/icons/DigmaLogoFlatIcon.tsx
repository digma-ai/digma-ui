import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const DigmaLogoFlatIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 22 25"
    >
      <linearGradient id="grad">
        <stop offset="0%" stopColor="#6165b2" />
        <stop offset="100%" stopColor="#2e2d9d" />
      </linearGradient>
      <path
        fill={props.color || "url(#grad)"}
        d="M12.5 11.87V.5c3.16 3.58 9.47 8.84 9.47 12s-1.26 3.79-3.15 3.79c.63 1.26.63 8.21-7.58 8.21-6.57 0-7.37-5.47-6.95-8.21-1.9 0-3.79-1.26-3.79-3.79 0-4.04 6.32-9.26 9.47-12v11.37h2.53Z"
      />
    </svg>
  );
};

export const DigmaLogoFlatIcon = React.memo(DigmaLogoFlatIconComponent);
