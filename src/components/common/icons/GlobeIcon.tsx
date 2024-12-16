import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const GlobeIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <g clipPath="url(#globe-clip-1)">
        <path
          fill={color}
          d="M6 0a6 6 0 1 1 0 12A6 6 0 1 1 6 0Zm0 11.25c.391 0 .947-.338 1.45-1.343a6.55 6.55 0 0 0 .545-1.657h-4.01a7.5 7.5 0 0 0 .564 1.657C5.053 10.912 5.61 11.25 6 11.25ZM3.85 7.5h4.3c.065-.473.1-.977.1-1.5s-.035-1.027-.1-1.5h-4.3c-.065.473-.1.977-.1 1.5s.035 1.027.1 1.5Zm4.145-3.75a6.286 6.286 0 0 0-.544-1.657C6.947 1.087 6.39.75 6 .75s-.947.337-1.45 1.343a7.146 7.146 0 0 0-.566 1.657h4.01Zm.89.75C8.967 4.98 9 5.482 9 6s-.033 1.02-.115 1.5h2.147c.143-.476.218-.98.218-1.5s-.075-1.024-.218-1.5H8.885Zm-1.21-3.477c.493.664.882 1.611 1.107 2.727h1.962a5.258 5.258 0 0 0-3.068-2.727Zm-3.35 0a5.266 5.266 0 0 0-3.07 2.727h1.963c.225-1.116.614-2.063 1.106-2.727ZM.75 6c0 .52.076 1.024.218 1.5h2.126a11.93 11.93 0 0 1 0-3H.968C.826 4.976.75 5.48.75 6Zm9.994 2.25H8.782c-.225 1.116-.614 2.063-1.106 2.726a5.252 5.252 0 0 0 3.068-2.726Zm-7.526 0H1.255a5.26 5.26 0 0 0 3.07 2.726c-.493-.664-.882-1.61-1.107-2.726Z"
        />
      </g>
      <defs>
        <clipPath id="globe-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const GlobeIcon = React.memo(GlobeIconComponent);
