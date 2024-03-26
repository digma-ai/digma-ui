import { ForwardedRef, forwardRef, useState } from "react";
import * as s from "./styles";
import { TextFieldProps } from "./types";

const TextFieldComponent = (
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
    <s.TextInputControl>
      <s.Container
        $focused={isFocused}
        $isInValid={props.isInValid}
        className={props.className}
      >
        <s.IconContainer>
          <s.IconContainer $isInValid={props.isInValid}>
            {props.icon && <props.icon size={16} color={"currentColor"} />}
          </s.IconContainer>
          <s.Input
            type={"text"}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={props.disabled}
            $isInValid={props.isInValid}
            ref={ref}
          />
          {props.inputEndContent && <div>{props.inputEndContent}</div>}
        </s.IconContainer>
      </s.Container>
      {props.error && <s.ErrorMessage>{props.error}</s.ErrorMessage>}
    </s.TextInputControl>
  );
};

export const TextField = forwardRef(TextFieldComponent);
