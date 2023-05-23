import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const ClockWithTicksIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 22 22"
    >
      <path
        fill={color}
        d="M16.9984 11.5048A6.0096 6.0096 0 0 1 13.07 16.636a6.0095 6.0095 0 0 1-6.3096-1.3964 6.0102 6.0102 0 0 1 3.7348-10.238.4634.4634 0 0 1 .0762.9236 5.0867 5.0867 0 1 0 5.5034 5.5034.4636.4636 0 0 1 .4999-.4237.4634.4634 0 0 1 .4237.4999Zm-6.4651-3.7325v3.2326a.462.462 0 0 0 .4618.4618h3.2326a.4618.4618 0 1 0 0-.9236h-2.7708V7.7723a.4619.4619 0 0 0-.9236 0Zm2.309-1.3853a.6926.6926 0 1 0 0-1.3852.6926.6926 0 0 0 0 1.3852Zm2.0781 1.3853a.6925.6925 0 0 0 .6793-.8278.693.693 0 0 0-.5442-.5442.6926.6926 0 1 0-.1351 1.372Zm1.3853 2.0781a.6928.6928 0 0 0 .1352-1.372.6926.6926 0 1 0-.1352 1.372Z"
      />
    </svg>
  );
};

export const ClockWithTicksIcon = React.memo(ClockWithTicksIconComponent);
