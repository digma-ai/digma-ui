import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const AffectIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg width={size} height={size} fill="none">
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#affect-12px-clip-1)"
      >
        <path d="M3.79 7.99 1.367 7.1a.371.371 0 0 1 0-.696l2.421-.891a.37.37 0 0 0 .22-.22l.89-2.421a.371.371 0 0 1 .697 0l.891 2.421a.37.37 0 0 0 .22.22l2.421.89a.371.371 0 0 1 0 .697l-2.421.89a.37.37 0 0 0-.22.22l-.89 2.422a.371.371 0 0 1-.697 0l-.89-2.421a.37.37 0 0 0-.22-.22ZM8.25.75V3m2.25.375v1.5m-3.375-3h2.25m.375 2.25h1.5" />
      </g>
      <defs>
        <clipPath id="affect-12px-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const AffectIcon = React.memo(AffectIconComponent);
