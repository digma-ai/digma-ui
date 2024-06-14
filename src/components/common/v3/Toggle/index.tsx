import * as s from "./styles";
import { ToggleProps, ToggleValue } from "./types";

export const Toggle = <T extends ToggleValue>({
  size = "large",
  options,
  value,
  onValueChange
}: ToggleProps<T>) => {
  const handleOptionButtonClick = (value: T) => {
    onValueChange(value);
  };

  return (
    <s.Container>
      {options.map((option) => (
        <s.OptionButton
          $size={size}
          key={option.value}
          $selected={value === option.value}
          onClick={() => handleOptionButtonClick(option.value)}
        >
          {option.label}
          {option.icon && <option.icon color={"currentColor"} />}
        </s.OptionButton>
      ))}
    </s.Container>
  );
};
