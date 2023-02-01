export interface ButtonProps {
  icon?: JSX.Element;
  label: string;
  onClick: () => void;
  isDisabled?: boolean;
}
