import Lottie, { type Options } from "react-lottie";
import animationData from "./animation.json";
import type { ThreeCirclesSpinnerProps } from "./types";

export const ThreeCirclesSpinner = ({
  size = 30
}: ThreeCirclesSpinnerProps) => {
  const options: Options = {
    loop: true,
    autoplay: true,
    animationData
  };

  return (
    <Lottie
      options={options}
      height={size}
      width={size}
      style={{ margin: 0, flexShrink: 0 }}
    />
  );
};
