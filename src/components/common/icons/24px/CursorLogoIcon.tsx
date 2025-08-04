import React from "react";
import { useIconProps } from "../hooks";
import type { ThemeableIconProps } from "../types";

const CursorLogoIconComponent = (props: ThemeableIconProps) => {
  const { size } = useIconProps(props);

  const color = props.themeKind === "light" ? "#000" : "#fff";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path
        fill="url(#cursor-logo-24px-linear-gradient-1)"
        d="m12 24 10-6-10-6-10 6 10 6z"
      />
      <path
        fill="url(#cursor-logo-24px-linear-gradient-2)"
        d="M22 18V6L12 0v12l10 6z"
      />
      <path
        fill="url(#cursor-logo-24px-linear-gradient-3)"
        d="M12 0 2 6v12l10-6V0z"
      />
      <path fill="#555" d="M22 6 12 24V12l10-6z" />
      <path fill={color} d="m22 6-10 6L2 6h20z" />
      <defs>
        <linearGradient
          id="cursor-logo-24px-linear-gradient-1"
          x1="11.9"
          x2="11.9"
          y1="12"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} offset=".2" stopOpacity=".4" />
          <stop stopColor={color} offset=".7" stopOpacity=".8" />
        </linearGradient>
        <linearGradient
          id="cursor-logo-24px-linear-gradient-2"
          x1="22.4"
          x2="11.9"
          y1="6"
          y2="12.2"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} offset=".2" stopOpacity=".3" />
          <stop stopColor={color} offset=".7" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="cursor-logo-24px-linear-gradient-3"
          x1="11.9"
          x2="1.5"
          y1="0"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color} stopOpacity=".6" />
          <stop stopColor={color} offset=".7" stopOpacity=".2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const CursorLogoIcon = React.memo(CursorLogoIconComponent);
