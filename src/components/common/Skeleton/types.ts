export interface SkeletonProps {
  width?: number;
  height?: number;
  gradient?: boolean;
  type: "rectangle" | "circle" | "text";
}

export interface SkeletonElementProps {
  $width?: number;
  $height?: number;
  $gradient?: boolean;
}
