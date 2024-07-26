import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const EnvironmentIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Master/Environment" clipPath="url(#clip0_2457_2880)">
        <path
          id="Vector"
          d="M6 11C8.48528 11 10.5 8.98528 10.5 6.5C10.5 4.01472 8.48528 2 6 2C3.51472 2 1.5 4.01472 1.5 6.5C1.5 8.98528 3.51472 11 6 11Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M4.125 6.50006C4.125 8.256 4.74984 9.82443 5.73187 10.8824C5.76599 10.9195 5.80743 10.9491 5.85359 10.9694C5.89974 10.9897 5.9496 11.0001 6 11.0001C6.0504 11.0001 6.10026 10.9897 6.14641 10.9694C6.19257 10.9491 6.23401 10.9195 6.26813 10.8824C7.25016 9.82443 7.875 8.256 7.875 6.50006C7.875 4.74412 7.25016 3.17568 6.26813 2.11771C6.23401 2.08061 6.19257 2.05099 6.14641 2.03072C6.10026 2.01046 6.0504 2 6 2C5.9496 2 5.89974 2.01046 5.85359 2.03072C5.80743 2.05099 5.76599 2.08061 5.73187 2.11771C4.74984 3.17568 4.125 4.74412 4.125 6.50006Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M1.75598 5H10.2441"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_4"
          d="M1.75598 8H10.2441"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2457_2880">
          <rect
            width="12"
            height="12"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export const EnvironmentIcon = React.memo(EnvironmentIconComponent);
