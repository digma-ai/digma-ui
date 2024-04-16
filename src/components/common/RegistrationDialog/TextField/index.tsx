import { FocusEvent, ForwardedRef, forwardRef, useState } from "react";
import { CheckmarkCircleInvertedIcon } from "../../icons/CheckmarkCircleInvertedIcon";
import { CrossCircleIcon } from "../../icons/CrossCircleIcon";
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

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (props.onBlur) {
      props.onBlur(e);
    }
    setIsFocused(false);
  };

  return (
    <s.Container
      $focused={isFocused}
      $isValid={props.isValid}
      className={props.className}
    >
      {props.icon && (
        <s.IconContainer $isValid={props.isValid}>
          <props.icon size={16} color={"currentColor"} />
        </s.IconContainer>
      )}
      <s.Input
        $isValid={props.isValid}
        type={props.type || "text"}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={ref}
      />
      {props.isValid === true && (
        <s.ValidationStatusIconContainer $isValid={props.isValid}>
          <CheckmarkCircleInvertedIcon size={11} color={"currentColor"} />
        </s.ValidationStatusIconContainer>
      )}
      {props.isValid === false && (
        <s.IconContainer $isValid={props.isValid}>
          <CrossCircleIcon size={15} color={"currentColor"} />
        </s.IconContainer>
      )}
    </s.Container>
  );
};

export const TextField = forwardRef(TextFieldComponent);
