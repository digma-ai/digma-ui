import React from "react";
import { useIconProps } from "./hooks";
import { ThemeableIconProps } from "./types";

const ChartIconComponent = (props: ThemeableIconProps) => {
  const { size, color } = useIconProps(props);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 12 12"
    >
      <path
        fill={color}
        d="M10.875 9.75a.3752.3752 0 0 1-.375.375h-9a.375.375 0 0 1-.375-.375v-7.5a.375.375 0 1 1 .75 0v4.4236l2.378-2.0799a.375.375 0 0 1 .472-.0178l2.7567 2.0677 2.7713-2.4249a.3744.3744 0 0 1 .4244-.0723.3743.3743 0 0 1 .1962.2233.3762.3762 0 0 1-.0281.296.3744.3744 0 0 1-.0985.1155l-3 2.625a.375.375 0 0 1-.472.0179L4.5183 5.3573 1.875 7.6702V9.375H10.5a.3752.3752 0 0 1 .375.375Z"
      />
    </svg>
  );
};

export const ChartIcon = React.memo(ChartIconComponent);
