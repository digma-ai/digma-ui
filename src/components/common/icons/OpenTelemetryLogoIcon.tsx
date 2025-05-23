import React from "react";
import { useIconProps } from "./hooks";
import type { IconProps } from "./types";

const OpenTelemetryLogoIconComponent = (props: IconProps) => {
  const { size } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <g clipPath="url(#opentelemetry-logo-clip-1)">
        <path
          fill="#4B5FAB"
          d="M9.701 4.908a.387.387 0 0 1-.118.294c-.284.283-.568.567-.85.852-.04.04-.06.034-.098-.001a1.909 1.909 0 0 0-1.143-.525c-.479-.05-.918.06-1.317.327-.04.027-.066.02-.099-.012-.354-.357-.71-.711-1.065-1.067a.404.404 0 0 1 0-.565l1.797-1.798a.415.415 0 0 1 .582.01c.13.127.258.257.387.386l1.79 1.789c.086.087.137.19.134.31Z"
        />
        <path
          fill="#F6A81C"
          d="M12 3.54a.384.384 0 0 1-.12.29c-.263.26-.529.52-.785.787a.42.42 0 0 1-.603.006l-.022-.021-3.07-3.07c-.153-.154-.19-.34-.098-.514A.365.365 0 0 1 7.368.93c.271-.273.543-.545.816-.817a.401.401 0 0 1 .56 0c1.05 1.048 2.098 2.097 3.147 3.146a.37.37 0 0 1 .11.28H12Z"
        />
        <path
          fill="#4B5FAB"
          d="M3.764 9.957a.401.401 0 0 1-.306-.118L2.164 8.545a.39.39 0 0 1-.001-.562l2.291-2.29a.393.393 0 0 1 .562-.002c.202.2.401.402.603.601.036.036.044.063.013.108a1.942 1.942 0 0 0-.325.949c-.025.322.027.63.153.925.028.065.024.105-.029.157-.47.467-.939.936-1.406 1.405a.379.379 0 0 1-.261.12Z"
        />
        <path
          fill="#F6A81C"
          d="M5.964 7.481c0-.73.586-1.31 1.322-1.31a1.32 1.32 0 0 1 1.307 1.32c0 .726-.595 1.312-1.334 1.309a1.31 1.31 0 0 1-1.295-1.32Zm.67.005a.641.641 0 1 0 1.283 0 .634.634 0 0 0-.642-.642.64.64 0 0 0-.64.643ZM1.723 12a.31.31 0 0 1-.24-.098L.099 10.518a.328.328 0 0 1 0-.47.33.33 0 0 1 .47 0l.167.168c.04.04.079.04.118.002l.765-.765c.17-.17.384-.17.553-.002l.383.382c.165.166.165.383-.002.55l-.77.769c-.037.037-.036.075.002.113l.172.172a.328.328 0 0 1 .07.36.321.321 0 0 1-.304.203Z"
        />
      </g>
      <defs>
        <clipPath id="opentelemetry-logo-clip-1">
          <path fill="#fff" d="M0 0h12v12H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const OpenTelemetryLogoIcon = React.memo(OpenTelemetryLogoIconComponent);
