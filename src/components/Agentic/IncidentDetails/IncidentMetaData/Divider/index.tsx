import React from "react";
import { useIconProps } from "../../../../common/icons/hooks";
import type { IconProps } from "../../../../common/icons/types";

const DividerComponent = (props: IconProps) => {
  const { color } = useIconProps(props);

  return (
    <svg
      xmlns={"http://www.w3.org/2000/svg"}
      fill={"none"}
      viewBox={"0 0 16 27"}
    >
      <path stroke={color} d={"M15 .94.5 26.06"} />
    </svg>
  );
};

export const Divider = React.memo(DividerComponent);
