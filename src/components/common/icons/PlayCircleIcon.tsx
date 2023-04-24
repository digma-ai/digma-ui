import React from "react";
import { useIconProps } from "./hooks";
import { IconProps } from "./types";

const PlayCircleIconComponent = (props: IconProps) => {
  const { size, color } = useIconProps(props);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 3.5C13.4288 3.5 10.9154 4.26244 8.77759 5.6909C6.63975 7.11935 4.97351 9.14968 3.98957 11.5251C3.00563 13.9006 2.74819 16.5144 3.2498 19.0362C3.75141 21.5579 4.98953 23.8743 6.80762 25.6924C8.6257 27.5105 10.9421 28.7486 13.4638 29.2502C15.9856 29.7518 18.5995 29.4944 20.9749 28.5104C23.3503 27.5265 25.3807 25.8603 26.8091 23.7224C28.2376 21.5846 29 19.0712 29 16.5C28.9964 13.0533 27.6256 9.74882 25.1884 7.31163C22.7512 4.87445 19.4467 3.50364 16 3.5ZM16 27.5C13.8244 27.5 11.6977 26.8549 9.88873 25.6462C8.07979 24.4375 6.66989 22.7195 5.83733 20.7095C5.00477 18.6995 4.78693 16.4878 5.21137 14.354C5.63581 12.2202 6.68345 10.2602 8.22183 8.72183C9.76021 7.18345 11.7202 6.1358 13.854 5.71136C15.9878 5.28692 18.1995 5.50476 20.2095 6.33733C22.2195 7.16989 23.9375 8.57979 25.1462 10.3887C26.3549 12.1977 27 14.3244 27 16.5C26.9967 19.4164 25.8367 22.2123 23.7745 24.2745C21.7123 26.3367 18.9164 27.4967 16 27.5ZM20.555 15.6675L14.555 11.6675C14.4044 11.567 14.2293 11.5093 14.0484 11.5005C13.8675 11.4918 13.6877 11.5323 13.528 11.6177C13.3684 11.7032 13.2349 11.8304 13.1419 11.9858C13.0489 12.1412 12.9999 12.3189 13 12.5V20.5C12.9999 20.6811 13.0489 20.8588 13.1419 21.0142C13.2349 21.1696 13.3684 21.2968 13.528 21.3823C13.6877 21.4677 13.8675 21.5082 14.0484 21.4995C14.2293 21.4907 14.4044 21.433 14.555 21.3325L20.555 17.3325C20.6922 17.2412 20.8047 17.1175 20.8825 16.9722C20.9603 16.827 21.001 16.6648 21.001 16.5C21.001 16.3352 20.9603 16.173 20.8825 16.0278C20.8047 15.8825 20.6922 15.7588 20.555 15.6675ZM15 18.6313V14.375L18.1975 16.5L15 18.6313Z"
        fill={color}
      />
    </svg>
  );
};

export const PlayCircleIcon = React.memo(PlayCircleIconComponent);
