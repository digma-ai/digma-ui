import * as s from "./styles";
import { TextFieldProps } from "./types";

export const ActionableTextField = (props: TextFieldProps) => {

  return (
    <s.TextFieldContainer>
      <s.Label>{props.label}</s.Label>
      <s.ReleativeTextField
        placeholder={props.placeholder ?? ''}
        value={props.value ?? ''}
        onChange={props.onChange}
        disabled={props.disabled}
        inputEndContent={
          <s.ButtonContainer>
            {props.buttons}
          </s.ButtonContainer>}
      />
      <s.ErrorMessage>{props.errorMessage}</s.ErrorMessage>
    </s.TextFieldContainer>
  )
}