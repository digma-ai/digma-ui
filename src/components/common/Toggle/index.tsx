import * as s from "./styles";
import type { ToggleProps, ToggleValue } from "./types";

export const Toggle = ({ onValueChange, options, value }: ToggleProps) => {
  const handleOptionButtonClick = (value: ToggleValue) => () => {
    onValueChange(value);
  };

  return (
    <s.Container>
      {options.map((option) => (
        <s.OptionButton
          key={option.value}
          $selected={value === option.value}
          onClick={handleOptionButtonClick(option.value)}
        >
          {option.label}
        </s.OptionButton>
      ))}
    </s.Container>
  );
};
