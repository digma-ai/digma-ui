import { forwardRef } from "react";
import * as s from "./styles";
import { ToggleProps, ToggleValue } from "./types";

const ToggleComponent = <T extends ToggleValue>({
  size = "large",
  options,
  value,
  onValueChange,
  className
}: ToggleProps<T>) => {
  const handleOptionButtonClick = (value: T) => {
    onValueChange(value);
  };

  return (
    <s.Container className={className}>
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

export const Toggle = forwardRef(ToggleComponent) as typeof ToggleComponent;
