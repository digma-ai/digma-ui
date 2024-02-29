import * as s from "./styles";
import { ToggleProps, ToggleValue } from "./types";

export const Toggle = <T extends ToggleValue>(props: ToggleProps<T>) => {
  const handleOptionButtonClick = (value: T) => {
    props.onValueChange(value);
  };

  return (
    <s.Container>
      {props.options.map((option) => (
        <s.OptionButton
          key={option.value}
          $selected={props.value === option.value}
          onClick={() => handleOptionButtonClick(option.value)}
        >
          {option.label}
        </s.OptionButton>
      ))}
    </s.Container>
  );
};
