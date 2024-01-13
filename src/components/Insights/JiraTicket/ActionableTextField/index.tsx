import * as s from "./styles";
import { TextFieldProps as ActionableTextFieldProps } from "./types";

export const ActionableTextField = (props: ActionableTextFieldProps) => {
  return (
    <s.TextFieldContainer>
      <s.Label>{props.label}</s.Label>
      <s.RelativeTextField
        placeholder={props.placeholder ?? ""}
        value={props.value ?? ""}
        onChange={props.onChange}
        disabled={props.disabled}
        inputEndContent={<s.ButtonContainer>{props.buttons}</s.ButtonContainer>}
      />
      <s.ErrorMessage>{props.errorMessage}</s.ErrorMessage>
    </s.TextFieldContainer>
  );
};
