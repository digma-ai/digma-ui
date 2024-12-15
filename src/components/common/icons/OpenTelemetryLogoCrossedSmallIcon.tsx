import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const OpenTelemetryLogoCrossedSmallIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 72 72"
    >
      <g clipPath="url(#openTelemetryLogoCrossedSmall-clip-1)">
        <path
          fill={color}
          d="M60 26.16c0 .46-.16.84-.48 1.16-1.05 1.04-2.12 2.08-3.14 3.15-.6.62-1.66.76-2.41.02l-.09-.08L41.6 18.13c-.61-.62-.76-1.36-.4-2.06.07-.13.17-.24.27-.34 1.09-1.1 2.17-2.19 3.27-3.27a1.6 1.6 0 0 1 2.24 0l12.58 12.58c.31.31.45.69.44 1.12ZM18.9 60c-.39.01-.7-.12-.97-.39l-5.53-5.54a1.31 1.31 0 0 1 0-1.88 1.32 1.32 0 0 1 1.87 0l.67.67c.16.16.32.17.47.01l3.07-3.06c.67-.68 1.53-.68 2.2 0l1.54 1.52c.66.67.66 1.53 0 2.2l-3.09 3.08c-.14.15-.14.3.01.45l.69.69a1.31 1.31 0 0 1-.94 2.24Z"
        />
        <path
          fill={color}
          fillRule="evenodd"
          d="m38.45 34.52-6.2-5.9 6.98-6.97c.63-.62 1.67-.6 2.33.04l1.07 1.07.48.48 7.16 7.15c.34.35.55.76.53 1.24.01.47-.14.86-.47 1.18a670.77 670.77 0 0 0-3.4 3.4c-.16.16-.24.14-.39 0a7.63 7.63 0 0 0-4.57-2.1 7.76 7.76 0 0 0-3.52.41Z"
          clipRule="evenodd"
        />
        <path stroke={color} strokeLinecap="round" d="m18 20 36 34" />
        <path
          fill={color}
          fillRule="evenodd"
          d="m35.87 41.5-.02.43a5.24 5.24 0 0 0 5.96 5.22l-5.94-5.65Zm10.5.57-5.64-5.37.42-.02a5.28 5.28 0 0 1 5.22 5.39Zm-17.05-6.81 4.32 4.11a8.04 8.04 0 0 0 .2 5.73c.11.25.1.42-.11.63-1.89 1.86-3.76 3.74-5.63 5.61-.32.32-.69.48-1.04.49a1.6 1.6 0 0 1-1.23-.47l-1.03-1.04-4.14-4.14a1.56 1.56 0 0 1 0-2.25l8.66-8.67Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="openTelemetryLogoCrossedSmall-clip-1">
          <path fill="#fff" d="M12 12h48v48H12z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const OpenTelemetryLogoCrossedSmallIcon = React.memo(
  OpenTelemetryLogoCrossedSmallIconComponent
);
