import { ForwardedRef, forwardRef, useState } from "react";
import * as s from "./styles";
import { TextFieldProps } from "./types";

export const TextFieldComponent = (
  props: TextFieldProps,
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
    <s.Container $focused={isFocused} className={props.className}>
      <s.Input
        type={"text"}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={ref}
      />
      {props.inputEndContent && <div>{props.inputEndContent}</div>}
    </s.Container>
  );
};

export const TextField = forwardRef(TextFieldComponent);
