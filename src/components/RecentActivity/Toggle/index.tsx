import * as s from "./styles";
import type { ToggleProps } from "./types";

export const Toggle = <T extends string>({
  onChange,
  options,
  value
}: ToggleProps<T>) => {
  const handleValueChange = (value: T) => {
    onChange(value);
  };

  return (
    <s.Container>
      {options.map((option) => {
        const isSelected = option.value === value;

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
