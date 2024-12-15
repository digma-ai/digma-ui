import React from "react";
import { useIconProps } from "./hooks";
import type { ThemeableIconProps } from "./types";

const CardsIconComponent = (props: ThemeableIconProps) => {
  const { size } = useIconProps(props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="67 0 72 72"
    >
      <g id="Frame 1707480437">
        <g id="Group 13">
          <g id="Group 16">
            <g id="Rectangle 473" filter="url(#cards-filter-1)">
              <rect
                x="86.5789"
                y="20"
                width="40.421"
                height="13.6421"
                rx="4"
                fill={props.themeKind === "light" ? "#f1f5fa" : "#83858e"}
              />
            </g>
            <circle
              id="Ellipse 9"
              cx="90.1158"
              cy="23.5368"
              r="1.51579"
              fill={props.themeKind === "light" ? "#d0d6eb" : "#484848"}
            />
            <path
              id="Vector 1"
              d="M93.1474 23.5368H124.474"
              stroke={props.themeKind === "light" ? "#d0d6eb" : "#484848"}
              strokeLinecap="round"
            />
          </g>
          <g id="Group 15">
            <g id="Rectangle 473_2" filter="url(#filter1_d_834_25851)">
              <rect
                x="83.0421"
                y="28.5895"
                width="40.421"
                height="13.6421"
                rx="4"
                fill={props.themeKind === "light" ? "#f1f5fa" : "#83858e"}
              />
            </g>
            <circle
              id="Ellipse 9_2"
              cx="86.5789"
              cy="32.1263"
              r="1.51579"
              fill={props.themeKind === "light" ? "#d0d6eb" : "#484848"}
            />
            <path
              id="Vector 1_2"
              d="M89.6105 32.1263H120.937"
              stroke={props.themeKind === "light" ? "#d0d6eb" : "#484848"}
              strokeLinecap="round"
            />
          </g>
          <g id="Group 14">
            <g id="Rectangle 473_3" filter="url(#filter2_d_834_25851)">
              <rect
                x="79"
                y="38.1895"
                width="40.421"
                height="13.6421"
                rx="4"
                fill={props.themeKind === "light" ? "#f1f5fa" : "#83858e"}
              />
            </g>
            <circle
              id="Ellipse 9_3"
              cx="82.5369"
              cy="41.7263"
              r="1.51579"
              fill={props.themeKind === "light" ? "#d0d6eb" : "#484848"}
            />
            <path
              id="Vector 1_3"
              d="M85.5684 41.7263H116.895"
              stroke={props.themeKind === "light" ? "#d0d6eb" : "#484848"}
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
      <defs>
        <filter
          id="cards-filter-1"
          x="83.5789"
          y="17"
          width="48.4211"
          height="21.6421"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_834_25851"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_834_25851"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_834_25851"
          x="80.0421"
          y="25.5895"
          width="48.4211"
          height="21.6421"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_834_25851"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_834_25851"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_834_25851"
          x="76"
          y="35.1895"
          width="48.4211"
          height="21.6421"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_834_25851"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_834_25851"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export const CardsIcon = React.memo(CardsIconComponent);
