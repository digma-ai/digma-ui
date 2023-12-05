import * as s from "./styles";
import { NewButtonProps } from "./types";

export const NewButton = (props: NewButtonProps) => {
  const buttonType = props.buttonType || "primary";
  const buttonSize = props.size || "small";
  const iconSize = buttonSize === "large" ? 16 : 13;

  return (
    <s.Button
      disabled={props.disabled}
      title={props.title}
      onClick={props.onClick}
      $type={buttonType}
      className={props.className}
      $size={buttonSize}
      type={props.type}
      form={props.form}
    >
      {props.icon && <props.icon size={iconSize} color={"currentColor"} />}
      {typeof props.label === "string" && (
        <s.Label
          $disabled={props.disabled}
          $size={buttonSize}
          $type={buttonType}
        >
          {props.label}
        </s.Label>
      )}
    </s.Button>
  );
};
