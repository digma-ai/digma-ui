import React from "react";
import { useIconProps } from "../hooks";
import type { IconProps } from "../types";

export const GoogleLogoIconComponent = (props: IconProps) => {
  const { size } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 21 20"
    >
      <path
        fill="#4285F4"
        fillRule="evenodd"
        d="M20.1 10.227c0-.709-.064-1.39-.182-2.045H10.5v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35Z"
        clipRule="evenodd"
      />
      <path
        fill="#34A853"
        fillRule="evenodd"
        d="M10.5 20c2.7 0 4.964-.895 6.618-2.422l-3.232-2.51c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.759-5.595-4.123H1.564v2.591a9.996 9.996 0 0 0 8.936 5.51Z"
        clipRule="evenodd"
      />
      <path
        fill="#FBBC05"
        fillRule="evenodd"
        d="M4.905 11.9c-.2-.6-.314-1.24-.314-1.9 0-.658.114-1.3.314-1.9V5.51H1.564A9.996 9.996 0 0 0 .5 10a9.99 9.99 0 0 0 1.064 4.492l3.34-2.591Z"
        clipRule="evenodd"
      />
      <path
        fill="#EA4335"
        fillRule="evenodd"
        d="M10.5 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C15.459.99 13.195 0 10.5 0a9.996 9.996 0 0 0-8.936 5.51l3.34 2.59c.787-2.364 2.991-4.123 5.596-4.123Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const GoogleLogoIcon = React.memo(GoogleLogoIconComponent);
