import React from "react";

const CollapsedContainerEllipseIconComponent = () => {
  return (
    <svg width="102" height="37" fill="none">
      <g filter="url(#a)" opacity=".3">
        <ellipse cx="99" cy="23" fill="#7C90F8" rx="45" ry="36" />
      </g>
      <defs>
        <filter
          id="a"
          width="198"
          height="180"
          x="0"
          y="-67"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur
            result="effect1_foregroundBlur_8712_22280"
            stdDeviation="27"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const CollapsedContainerEllipseIcon = React.memo(
  CollapsedContainerEllipseIconComponent
);
