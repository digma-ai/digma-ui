import * as s from "./styles";
import { ToggleProps } from "./types";

export const Toggle = <T extends string>(props: ToggleProps<T>) => {
  const handleValueChange = (value: T) => {
    props.onChange(value);
  };

  return (
    <s.Container>
      {props.options.map((option) => {
        const isSelected = option.value === props.value;

        return (
          <s.ToggleOptionButton
            key={option.value}
            $selected={isSelected}
            onClick={() => handleValueChange(option.value)}
          >
            <option.icon size={16} color={"currentColor"} />
          </s.ToggleOptionButton>
        );
      })}
    </s.Container>
  );
};
