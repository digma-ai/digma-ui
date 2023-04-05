import * as s from "./styles";
import { ToggleSwitchProps } from "./types";

export const ToggleSwitch = (props: ToggleSwitchProps) => {
  const handleContainerClick = () => {
    if (props.onChange) {
      props.onChange(!props.checked);
    }
  };
  return (
    <s.Container onClick={handleContainerClick}>
      {props.label}
      <s.SwitchContainer isChecked={props.checked}>
        <s.Circle isChecked={props.checked} />
      </s.SwitchContainer>
    </s.Container>
  );
};
