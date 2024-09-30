import React from "react";
import { useIconProps } from "./hooks";
import { ThemeableIconProps } from "./types";

const CardsColoredIconComponent = (props: ThemeableIconProps) => {
  const { size } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 40 31"
    >
      <g filter="url(#cards-colored-filter-1)">
        <rect
          width="28.07"
          height="11.47"
          x="8.1"
          y="2.95"
          fill="#828599"
          rx="2.78"
        />
      </g>
      <circle cx="10.55" cy="5.61" r="1.05" fill="#27282E" />
      <path stroke="#27282E" strokeLinecap="round" d="M12.6 5.56h7" />
      <g filter="url(#cards-colored-filter-2)">
        <rect
          width="28.07"
          height="11.47"
          x="5.64"
          y="8.91"
          fill="#ACAFBF"
          rx="2.78"
        />
      </g>
      <circle cx="8.1" cy="11.61" r="1.05" fill="#27282E" />
      <path stroke="#27282E" strokeLinecap="round" d="M10.5 11.56h7" />
      <g filter="url(#cards-colored-filter-3">
        <rect
          width="28.07"
          height="11.47"
          x="2.83"
          y="15.58"
          fill="#C3C6D9"
          rx="2.78"
        />
      </g>
      <circle cx="5.55" cy="17.61" r="1.05" fill="#27282E" />
      <path stroke="#27282E" strokeLinecap="round" d="M7.76 17.56h7" />
      <defs>
        <filter
          id="cards-colored-filter-1"
          width="33.63"
          height="17.03"
          x="6.01"
          y=".87"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx=".69" dy=".69" />
          <feGaussianBlur stdDeviation="1.39" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_14664_21680"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_14664_21680"
            result="shape"
          />
        </filter>
        <filter
          id="cards-colored-filter-2"
          width="33.63"
          height="17.03"
          x="3.56"
          y="6.83"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx=".69" dy=".69" />
          <feGaussianBlur stdDeviation="1.39" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_14664_21680"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_14664_21680"
            result="shape"
          />
        </filter>
        <filter
          id="cards-colored-filter-3"
          width="33.63"
          height="17.03"
          x=".75"
          y="13.5"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dx=".69" dy=".69" />
          <feGaussianBlur stdDeviation="1.39" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_14664_21680"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_14664_21680"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const CardsColoredIcon = React.memo(CardsColoredIconComponent);
