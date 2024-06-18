import { FocusEvent, ForwardedRef, forwardRef, useState } from "react";
import { CheckmarkCircleInvertedIcon } from "../../icons/CheckmarkCircleInvertedIcon";
import { CrossCircleIcon } from "../../icons/CrossCircleIcon";
import * as s from "./styles";
import { TextFieldProps } from "./types";

export const TextFieldComponent = (
  {
    onBlur,
    isValid,
    className,
    icon: Icon,
    type = "text",
    value,
    onChange,
    placeholder
  }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
    }
    setIsFocused(false);
  };

  return (
    <s.Container $focused={isFocused} $isValid={isValid} className={className}>
      {Icon && (
        <s.IconContainer $isValid={isValid}>
          <Icon size={16} color={"currentColor"} />
        </s.IconContainer>
      )}
      <s.Input
        $isValid={isValid}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={ref}
      />
      {isValid === true && (
        <s.ValidationStatusIconContainer $isValid={isValid}>
          <CheckmarkCircleInvertedIcon size={11} color={"currentColor"} />
        </s.ValidationStatusIconContainer>
      )}
      {isValid === false && (
        <s.IconContainer $isValid={isValid}>
          <CrossCircleIcon size={15} color={"currentColor"} />
        </s.IconContainer>
      )}
    </s.Container>
  );
};

export const TextField = forwardRef(TextFieldComponent);
