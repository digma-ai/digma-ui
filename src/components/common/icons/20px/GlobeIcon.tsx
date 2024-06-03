import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

export const GlobeIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 20 20"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <g
          stroke="#F0F1F7"
          strokeLinecap="round"
          strokeLinejoin="round"
          clipPath="url(#globe-20px-clip-1)"
        >
          <path d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z" />
          <path d="M6.875 10c0 2.927 1.041 5.54 2.678 7.304a.608.608 0 0 0 .894 0c1.637-1.763 2.678-4.377 2.678-7.304 0-2.926-1.041-5.54-2.678-7.304a.608.608 0 0 0-.894 0C7.916 4.46 6.875 7.074 6.875 10ZM2.927 7.5h14.146m-14.146 5h14.146" />
        </g>
        <defs>
          <clipPath id="globe-20px-clip-1">
            <path fill="#fff" d="M0 0h20v20H0z" />
          </clipPath>
        </defs>
      </svg>
    </svg>
  );
};

export const GlobeIcon = React.memo(GlobeIconComponent);
