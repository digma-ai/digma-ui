import { ForwardedRef, forwardRef, useState } from "react";
import * as s from "./styles";
import { TextFieldProps } from "./types";

const TextFieldComponent = (
  {
    isInvalid,
    className,
    icon: Icon,
    type = "text",
    value,
    onChange,
    placeholder,
    disabled,
    inputEndContent,
    error
  }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <s.TextInputControl>
      <s.Container
        $focused={isFocused}
        $isInvalid={isInvalid}
        className={className}
      >
        <s.IconContainer $isInvalid={isInvalid}>
          {Icon && <Icon size={16} color={"currentColor"} />}
        </s.IconContainer>
        <s.Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          $isInvalid={isInvalid}
          ref={ref}
        />
        {inputEndContent}
      </s.Container>
      {error && <s.ErrorMessage>{error}</s.ErrorMessage>}
    </s.TextInputControl>
  );
};

export const TextField = forwardRef(TextFieldComponent);
