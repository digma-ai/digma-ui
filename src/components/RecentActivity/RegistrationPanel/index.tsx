import { ChangeEvent, KeyboardEvent, useState } from "react";
import { validateEmailFormat } from "../../../utils/validateEmailFormat";
import { CrossIcon } from "../../common/icons/CrossIcon";
import * as s from "./styles";
import { RegistrationPanelProps } from "./types";

const EMAIL_ERROR_MESSAGE = "Enter a valid email";

export const RegistrationPanel = (props: RegistrationPanelProps) => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleSubmitButtonClick = () => {
    props.onSubmit(email);
    props.onClose();
  };

  const handleCloseButtonClick = () => {
    props.onClose();
  };

  const handleEmailTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    const isEmailValid = validateEmailFormat(email);
    setIsEmailValid(isEmailValid);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && isEmailValid) {
      props.onSubmit(email);
      props.onClose();
    }
  };

  return (
    <s.Container onKeyDown={handleKeyDown}>
      <s.Header>
        <s.Title>Register with your email</s.Title>
        <s.CloseButton onClick={handleCloseButtonClick}>
          <CrossIcon color={"currentColor"} size={14} />
        </s.CloseButton>
      </s.Header>
      <s.Description>
        Please register using your work email to start collecting data from a
        centralized CI/test environment
      </s.Description>
      <s.TextFieldContainer>
        <s.EmailTextField
          value={email}
          onChange={handleEmailTextFieldChange}
          placeholder={"Enter your email"}
        />
        <s.SubmitButton
          disabled={!isEmailValid}
          onClick={handleSubmitButtonClick}
        >
          Submit
        </s.SubmitButton>
      </s.TextFieldContainer>
      {email.length > 0 && !isEmailValid && (
        <s.ErrorMessage>{EMAIL_ERROR_MESSAGE}</s.ErrorMessage>
      )}
    </s.Container>
  );
};
