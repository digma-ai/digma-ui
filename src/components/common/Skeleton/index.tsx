import * as s from "./styles";
import { SkeletonProps } from "./types";

export const Skeleton = ({ type, height, width, gradient }: SkeletonProps) => {
  switch (type) {
    case "rectangle":
      return (
        <s.RectangleSkeleton
          $height={height}
          $width={width}
          $gradient={gradient}
        />
      );
    case "circle":
      return <s.CircleSkeleton $height={height} $gradient={gradient} />;
    case "text":
      return (
        <s.TextSkeleton $height={height} $width={width} $gradient={true} />
      );
  }
};
