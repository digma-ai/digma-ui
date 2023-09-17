import { ChangeEvent, useState } from "react";
import { CrossIcon } from "../../common/icons/CrossIcon";
import * as s from "./styles";
import { RegistrationPanelProps } from "./types";

export const RegistrationPanel = (props: RegistrationPanelProps) => {
  const [email, setEmail] = useState("");

  const handleSubmitButtonClick = () => {
    props.onSubmit(email);
  };

  const handleCloseButtonClick = () => {
    props.onClose();
  };

  const handleEmailTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <s.Container>
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
        <s.SubmitButton onClick={handleSubmitButtonClick}>
          Submit
        </s.SubmitButton>
      </s.TextFieldContainer>
    </s.Container>
  );
};
