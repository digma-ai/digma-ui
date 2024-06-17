import React from "react";

const CollapsedContainerBackgroundIconComponent = () => {
  return (
    <svg width="158" height="36" fill="none">
      <path
        fill="#D5DCFF"
        d="M155.705 22.173c.946 0 1.711.719 1.711 1.607 0 .887-.765 1.607-1.711 1.607-.947 0-1.711-.72-1.711-1.607 0-.888.764-1.607 1.711-1.607Zm-83.157-9c.381 0 .685.288.685.643 0 .355-.304.643-.685.643-.381 0-.684-.288-.684-.643 0-.355.303-.643.684-.643ZM16.94 34.384c.476 0 .855.288.855.643 0 .355-.38.643-.856.643s-.855-.288-.855-.643c0-.355.379-.643.855-.643Z"
        opacity=".3"
      />
    </svg>
  );
};

export const CollapsedContainerBackgroundIcon = React.memo(
  CollapsedContainerBackgroundIconComponent
);
