export type BadgeSize = "small" | "large";

export interface BadgeProps {
  size?: BadgeSize;
  className?: string;
}

export interface BadgeElementProps {
  $backgroundColor?: string;
  $borderColor?: string;
  $size: BadgeSize;
}
