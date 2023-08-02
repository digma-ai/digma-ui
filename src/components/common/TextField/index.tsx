import { useState } from "react";
import * as s from "./styles";
import { TextFieldProps } from "./types";

export const TextField = (props: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <s.Container focused={isFocused}>
      <s.Input
        type={"text"}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {props.inputEndContent && <div>{props.inputEndContent}</div>}
    </s.Container>
  );
};
