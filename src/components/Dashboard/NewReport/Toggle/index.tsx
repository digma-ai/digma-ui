import * as s from "./styles";
import { ToggleProps, ToggleValue } from "./types";

export const Toggle = <T extends ToggleValue>({
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
          key={option.value}
          $selected={value === option.value}
          onClick={() => handleOptionButtonClick(option.value)}
        >
          {option.label}
        </s.OptionButton>
      ))}
    </s.Container>
  );
};
