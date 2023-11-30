import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { isValidEmailFormat } from "../../../utils/isValidEmailFormat";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { TextField } from "../../common/TextField";
import { CrossIcon } from "../../common/icons/CrossIcon";
import { WarningCircleLargeIcon } from "../../common/icons/WarningCircleLargeIcon";
import { isWorkEmail } from "./isWorkEmail";
import * as s from "./styles";
import { RegistrationFormData, RegistrationPanelProps } from "./types";

const validateTextFields = (data: RegistrationFormData): string | null => {
  if (data.fullName.length === 0) {
    return "Full name is required";
  }

  const emailMessage = "Please enter a valid work email address";

  if (!isValidEmailFormat(data.email)) {
    return emailMessage;
  }

  if (!isWorkEmail(data.email)) {
    return emailMessage;
  }

  return null;
};

export const RegistrationPanel = (props: RegistrationPanelProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const fullNameTextFieldRef = useRef<HTMLInputElement>(null);

  const errorMessage = validateTextFields({ fullName, email });

  useEffect(() => {
    fullNameTextFieldRef.current?.focus();
  }, []);

  const handleSubmitButtonClick = () => {
    props.onSubmit({
      fullName: fullName.trim(),
      email
    });
  };

  const handleCloseButtonClick = () => {
    props.onClose();
  };

  const handleFullNameTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
  };

  const handleEmailTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !errorMessage) {
      props.onSubmit({
        fullName,
        email
      });
    }
  };

  return (
    <s.Container onKeyDown={handleKeyDown}>
      <s.Header>
        <s.Title>Register</s.Title>
        <s.CloseButton onClick={handleCloseButtonClick}>
          <CrossIcon color={"currentColor"} size={14} />
        </s.CloseButton>
      </s.Header>
      Please register first to create new environments in Digma
      <TextField
        ref={fullNameTextFieldRef}
        value={fullName}
        onChange={handleFullNameTextFieldChange}
        placeholder={"Enter your full name"}
      />
      <TextField
        value={email}
        onChange={handleEmailTextFieldChange}
        placeholder={"Enter your email"}
      />
      {props.isRegistrationInProgress ? (
        <s.CircleLoaderContainer>
          <NewCircleLoader size={32} />
        </s.CircleLoaderContainer>
      ) : (
        <s.SubmitButton
          disabled={Boolean(errorMessage)}
          onClick={handleSubmitButtonClick}
        >
          Submit
        </s.SubmitButton>
      )}
      {email.length > 0 && errorMessage && (
        <s.ErrorMessage>
          <WarningCircleLargeIcon size={14} color={"currentColor"} />
          {errorMessage}
        </s.ErrorMessage>
      )}
    </s.Container>
  );
};
