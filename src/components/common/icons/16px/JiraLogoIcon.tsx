import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const JiraLogoIconComponent = (props: IconProps & { isActive?: boolean }) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={props.isActive ? color : "none"}
      viewBox="0 0 16 16"
    >
      <path
        stroke={color}
        d="M12.27 4.232v-.5h-1.683a2.398 2.398 0 0 1-2.345-1.898h5.868c.031 0 .057.026.057.057v5.827a2.4 2.4 0 0 1-1.897-2.344V4.232Z"
      />
      <path
        stroke={color}
        d="M9.091 6.934v1.645a2.4 2.4 0 0 0 1.899 2.343V5.094a.057.057 0 0 0-.057-.057H5.065a2.4 2.4 0 0 0 2.344 1.897m1.682 0H7.41m1.682 0H7.41m1.682 0H7.41"
      />
      <path
        stroke={color}
        d="M5.918 10.627v-.5H4.232A2.4 2.4 0 0 1 1.886 8.23h5.868c.031 0 .057.026.057.057v5.826a2.4 2.4 0 0 1-1.893-2.343v-1.142Z"
      />
    </svg>
  );
};

export const JiraLogoIcon = React.memo(JiraLogoIconComponent);
