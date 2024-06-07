import * as s from "./styles";
import { ToggleSwitchProps } from "./types";

export const ToggleSwitch = (props: ToggleSwitchProps) => {
  const size = props.size || "small";

  const handleContainerClick = () => {
    if (props.onChange) {
      props.onChange(!props.checked);
    }
  };
  return (
    <s.Container
      onClick={handleContainerClick}
      className={props.className}
      $size={size}
      $disabled={props.disabled}
    >
      {(!props.labelPosition || props.labelPosition === "start") && props.label}
      <s.SwitchContainer
        $disabled={props.disabled}
        $isChecked={props.checked}
        $size={size}
      >
        <s.Circle
          $disabled={props.disabled}
          $isChecked={props.checked}
          $size={size}
        />
      </s.SwitchContainer>
      {props.labelPosition === "end" && props.label}
    </s.Container>
  );
};
