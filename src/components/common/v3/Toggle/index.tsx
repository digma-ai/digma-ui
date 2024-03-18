import * as s from "./styles";
import { ToggleProps, ToggleValue } from "./types";

export const Toggle = <T extends ToggleValue>(props: ToggleProps<T>) => {
  const size = props.size || "large";

  const handleOptionButtonClick = (value: T) => {
    props.onValueChange(value);
  };

  return (
    <s.Container>
      {props.options.map((option) => (
        <s.OptionButton
          $size={size}
          key={option.value}
          $selected={props.value === option.value}
          onClick={() => handleOptionButtonClick(option.value)}
        >
          {option.label}
          {option.icon && <option.icon color={"currentColor"} />}
        </s.OptionButton>
      ))}
    </s.Container>
  );
};
