type CheckmarkSize = "small" | "large";

export interface CheckmarkProps {
  value: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
  size?: CheckmarkSize;
}

export interface CheckmarkComponentProps {
  $size?: CheckmarkSize;
}
