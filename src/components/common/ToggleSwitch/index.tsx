import * as s from "./styles";
import { ToggleSwitchProps } from "./types";

export const ToggleSwitch = ({
  size = "small",
  onChange,
  checked,
  className,
  disabled,
  labelPosition = "start",
  label
}: ToggleSwitchProps) => {
  const handleContainerClick = () => {
    if (onChange) {
      onChange(!checked);
    }
  };
  return (
    <s.Container
      onClick={handleContainerClick}
      className={className}
      $size={size}
      $disabled={disabled}
    >
      {labelPosition === "start" && label}
      <s.SwitchContainer $disabled={disabled} $isChecked={checked} $size={size}>
        <s.Circle $disabled={disabled} $isChecked={checked} $size={size} />
      </s.SwitchContainer>
      {labelPosition === "end" && label}
    </s.Container>
  );
};
