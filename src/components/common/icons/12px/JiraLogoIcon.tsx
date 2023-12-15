import React from "react";
import { useIconProps } from "../hooks";
import { IconProps } from "../types";

const JiraLogoIconComponent = (props: IconProps) => {
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
        stroke={color}
        d="M9.3276 3.1743v-.5h-1.387a1.6738 1.6738 0 0 1-1.5974-1.1738H10.5v4.1262c-.6791-.213-1.1719-.847-1.1724-1.5963v-.8561ZM6.9435 5.5752v-.5H5.5564c-.7491-.0006-1.383-.4933-1.596-1.1724h4.1569v4.1267c-.6794-.2124-1.1727-.846-1.1738-1.5954v-.8589ZM4.5636 7.9705v-.5H3.1738c-.7503 0-1.3852-.4936-1.5978-1.1738h4.1572v4.1254c-.6777-.2138-1.169-.8473-1.1696-1.5954v-.8562Z"
      />
    </svg>
  );
};

export const JiraLogoIcon = React.memo(JiraLogoIconComponent);
