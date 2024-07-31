import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const LogoutIconComponent = (props: IconProps) => {
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
        d="M10.29 1.33h-6.1c-.4 0-.8.16-1.08.44-.28.27-.44.65-.44 1.04V13.2c0 .39.16.76.44 1.04.29.28.68.44 1.08.44h6.1M13.33 8 10.3 5.04M13.33 8l-3.04 2.96M13.33 8H5.71"
      />
    </svg>
  );
};

export const LogoutIcon = React.memo(LogoutIconComponent);
