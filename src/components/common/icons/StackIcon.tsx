import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const StackIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <mask
        id="stack-mask-1"
        width="18"
        height="16"
        x="3"
        y="4"
        maskUnits="userSpaceOnUse"
        style={{ maskType: "alpha" }}
      >
        <g clipPath="url(#stack-clip-1)">
          <path
            fill="#000"
            fillRule="evenodd"
            d="M12 6.0016L6.79159 8L12 9.9984L17.2085 8L12 6.0016ZM11.3002 4.12796C11.5244 4.04306 11.7618 4 11.9996 4C12.2379 4 12.4753 4.04291 12.6999 4.12796L12.704 4.12952L20.3582 7.06636C20.7448 7.21469 21 7.58593 21 8C21 8.41407 20.7448 8.78531 20.3582 8.93364L12.6998 11.8721C12.4756 11.9569 12.2382 12 12.0004 12C11.7622 12 11.5248 11.9571 11.3002 11.872L11.2961 11.8705L3.6418 8.93364C3.25521 8.78531 3.00003 8.41407 3.00003 8C3.00003 7.58593 3.25521 7.21469 3.6418 7.06636L11.3002 4.12796ZM3.06639 11.6418C3.26423 11.1261 3.84262 10.8685 4.35825 11.0664L12 13.9984L19.6418 11.0664C20.1574 10.8685 20.7358 11.1261 20.9337 11.6418C21.1315 12.1574 20.8739 12.7358 20.3582 12.9336L12.6998 15.8721C12.4756 15.9569 12.2383 16 12.0004 16C11.7622 16 11.5248 15.9571 11.3002 15.872L11.2961 15.8705L3.6418 12.9336C3.12617 12.7358 2.86855 12.1574 3.06639 11.6418ZM3.06639 15.6418C3.26423 15.1261 3.84262 14.8685 4.35825 15.0664L12 17.9984L19.6418 15.0664C20.1574 14.8685 20.7358 15.1261 20.9337 15.6418C21.1315 16.1574 20.8739 16.7358 20.3582 16.9336L12.6998 19.8721C12.4756 19.9569 12.2383 20 12.0004 20C11.7622 20 11.5248 19.9571 11.3002 19.872L11.2961 19.8705L3.6418 16.9336C3.12617 16.7358 2.86855 16.1574 3.06639 15.6418Z"
            clipRule="evenodd"
          />
        </g>
      </mask>
      <g mask="url(#stack-mask-1)">
        <path fill={color} d="M0 0H24V24H0z" />
      </g>
      <defs>
        <clipPath id="stack-clip-1">
          <path fill="#fff" d="M0 0H18V16H0z" transform="translate(3 4)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const StackIcon = React.memo(StackIconComponent);
