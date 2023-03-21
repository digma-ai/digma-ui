export interface ButtonProps {
  icon?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  children: React.ReactNode;
  buttonType: "primary" | "secondary" | "success" | "failure";
}
