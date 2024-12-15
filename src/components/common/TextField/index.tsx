import type { ForwardedRef } from "react";
import { forwardRef, useState } from "react";
import * as s from "./styles";
import type { TextFieldProps } from "./types";

export const TextFieldComponent = (
  {
    className,
    value,
    onChange,
    placeholder,
    disabled,
    inputEndContent
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
    <s.Container $focused={isFocused} className={className}>
      <s.Input
        type={"text"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        ref={ref}
      />
      {inputEndContent && <div>{inputEndContent}</div>}
    </s.Container>
  );
};

export const TextField = forwardRef(TextFieldComponent);
