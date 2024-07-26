import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const ServiceIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg width={size} height={size} viewBox="0 0 12 13" fill="none">
      <g clipPath="url(#service_clip_a)">
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.875 6.45a3 3 0 0 1 3.75-4.232L6.75 4.25l.265 1.235 1.235.265 2.032-1.875a3 3 0 0 1-4.232 3.75l-2.628 3.047a1.127 1.127 0 0 1-1.594-1.594L4.875 6.45Z"
        />
      </g>
      <defs>
        <clipPath id="service_clip_a">
          <path fill="#fff" d="M0 .5h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ServiceIcon = React.memo(ServiceIconComponent);
