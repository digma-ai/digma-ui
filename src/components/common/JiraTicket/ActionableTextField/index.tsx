import * as s from "./styles";
import type { TextFieldProps as ActionableTextFieldProps } from "./types";

export const ActionableTextField = ({
  label,
  placeholder,
  value,
  onChange,
  disabled,
  buttons,
  errorMessage
}: ActionableTextFieldProps) => (
  <s.TextFieldContainer>
    <s.Label>{label}</s.Label>
    <s.RelativeTextField
      placeholder={placeholder ?? ""}
      value={value ?? ""}
      onChange={onChange}
      disabled={disabled}
      inputEndContent={<s.ButtonContainer>{buttons}</s.ButtonContainer>}
    />
    <s.ErrorMessage>{errorMessage}</s.ErrorMessage>
  </s.TextFieldContainer>
);
