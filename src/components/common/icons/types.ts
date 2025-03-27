export enum Direction {
  Left,
  Up,
  Right,
  Down
}

export interface IconProps {
  color?: string;
  size?: number;
  className?: string;
}

export interface RotatableIconProps extends IconProps {
  direction?: Direction;
}

export interface ThemeableIconProps extends IconProps {
  themeKind?: "light" | "dark";
}
