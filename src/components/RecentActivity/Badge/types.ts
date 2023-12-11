export type BadgeSize = "small" | "large";

export interface BadgeProps {
  backgroundColor?: string;
  borderColor?: string;
  size?: BadgeSize;
}

export interface BadgeElementProps {
  $backgroundColor?: string;
  $borderColor?: string;
  $size: BadgeSize;
}
