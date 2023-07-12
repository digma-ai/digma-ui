import React from "react";
import { useIconProps } from "./hooks";
import { ThemeableIconProps } from "./types";

const LightBulbCircleCrossedIconComponent = (props: ThemeableIconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 72 72"
    >
      <path
        fill={color}
        d="M45 55.5a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 1 1 0-3h15a1.5 1.5 0 0 1 1.5 1.5Zm7.5-24a16.41 16.41 0 0 1-6.3 12.98 3.05 3.05 0 0 0-1.2 2.4V48a3 3 0 0 1-3 3H30a3 3 0 0 1-3-3v-1.13a3 3 0 0 0-1.17-2.37 16.42 16.42 0 0 1-6.33-12.9A16.58 16.58 0 0 1 35.6 15a16.5 16.5 0 0 1 16.9 16.5Zm-6.02-1.75a10.8 10.8 0 0 0-8.73-8.73 1.5 1.5 0 1 0-.5 2.96 7.86 7.86 0 0 1 6.27 6.27 1.5 1.5 0 0 0 2.96-.5Z"
      />
      <rect
        width="58"
        height="2"
        x="15.63"
        y="14.84"
        fill={color}
        stroke={props.themeKind === "light" ? "#d0d6eb" : "#323334"}
        rx="1"
        transform="rotate(43.4 15.63 14.84)"
      />
    </svg>
  );
};

export const LightBulbCircleCrossedIcon = React.memo(
  LightBulbCircleCrossedIconComponent
);
