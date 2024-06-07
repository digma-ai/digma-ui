import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const OpenTelemetryLogoIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 16 16"
    >
      <g fill={color} clipPath="url(#open-telemetry-logo-16px-clip-1)">
        <path d="M12.935 6.544a.516.516 0 0 1-.158.392c-.378.378-.758.756-1.134 1.136-.052.052-.08.046-.13-.002a2.545 2.545 0 0 0-1.524-.7 2.58 2.58 0 0 0-1.756.436c-.054.037-.088.028-.131-.016-.473-.475-.948-.947-1.421-1.423a.538.538 0 0 1 0-.753c.798-.8 1.597-1.598 2.397-2.396a.553.553 0 0 1 .775.012c.174.17.345.344.517.516l2.385 2.385a.554.554 0 0 1 .18.413ZM16 4.72a.512.512 0 0 1-.16.386c-.35.348-.705.693-1.047 1.05a.56.56 0 0 1-.804.008l-.029-.029-4.092-4.092c-.206-.206-.254-.453-.132-.686a.486.486 0 0 1 .087-.115c.362-.364.725-.728 1.09-1.09a.535.535 0 0 1 .746 0c1.399 1.397 2.797 2.796 4.196 4.195.103.103.148.23.145.373ZM5.019 13.275a.535.535 0 0 1-.408-.156l-1.725-1.726a.52.52 0 0 1-.002-.749A4018.18 4018.18 0 0 1 5.939 7.59c.21-.21.538-.21.75 0 .268.265.534.535.803.8.048.048.059.084.018.145a2.59 2.59 0 0 0-.434 1.264c-.034.43.036.84.205 1.234.037.086.031.14-.04.21-.627.621-1.251 1.247-1.875 1.872a.505.505 0 0 1-.347.161Zm2.933-3.3c0-.973.782-1.748 1.763-1.747a1.76 1.76 0 0 1 1.742 1.759c0 .97-.793 1.75-1.778 1.746a1.746 1.746 0 0 1-1.727-1.758Zm.894.007c0 .47.385.86.856.856a.847.847 0 0 0 .854-.858c0-.482-.366-.847-.856-.855a.854.854 0 0 0-.854.857ZM2.297 16a.413.413 0 0 1-.32-.13c-.614-.616-1.23-1.23-1.845-1.846a.438.438 0 0 1 0-.626.439.439 0 0 1 .626 0l.223.223c.053.053.106.054.157.003l1.02-1.02c.227-.227.513-.228.738-.003l.51.51c.22.221.22.51-.002.732L2.378 14.87c-.05.05-.049.1.002.151l.23.23a.438.438 0 0 1 .093.48.428.428 0 0 1-.405.27Z" />
      </g>
      <defs>
        <clipPath id="open-telemetry-logo-16px-clip-1">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const OpenTelemetryLogoIcon = React.memo(OpenTelemetryLogoIconComponent);
