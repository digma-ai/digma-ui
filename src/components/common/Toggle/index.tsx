import * as s from "./styles";
import { ToggleProps, ToggleValue } from "./types";

export const Toggle = (props: ToggleProps) => {
  const handleOptionButtonClick = (value: ToggleValue) => {
    props.onValueChange(value);
  };

  return (
    <s.Container>
      {props.options.map((option) => (
        <s.OptionButton
          key={option.value}
          selected={props.value === option.value}
          onClick={() => handleOptionButtonClick(option.value)}
        >
          {option.label}
        </s.OptionButton>
      ))}
    </s.Container>
  );
};
