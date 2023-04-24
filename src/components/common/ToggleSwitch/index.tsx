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
      size={size}
    >
      {props.label}
      <s.SwitchContainer isChecked={props.checked} size={size}>
        <s.Circle isChecked={props.checked} size={size} />
      </s.SwitchContainer>
    </s.Container>
  );
};
