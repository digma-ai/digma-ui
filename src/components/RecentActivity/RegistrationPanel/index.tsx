import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { isValidEmailFormat } from "../../../utils/isValidEmailFormat";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { CrossIcon } from "../../common/icons/CrossIcon";
import { WarningCircleLargeIcon } from "../../common/icons/WarningCircleLargeIcon";
import { isWorkEmail } from "./isWorkEmail";
import * as s from "./styles";
import { RegistrationPanelProps } from "./types";

const validateEmail = (email: string): string | null => {
  const message = "Please enter a valid work email address";

  if (!isValidEmailFormat(email)) {
    return message;
  }

  if (!isWorkEmail(email)) {
    return message;
  }

  return null;
};

export const RegistrationPanel = (props: RegistrationPanelProps) => {
  const [email, setEmail] = useState("");
  const emailTextFieldRef = useRef<HTMLInputElement>(null);

  const errorMessage = validateEmail(email);

  useEffect(() => {
    emailTextFieldRef.current?.focus();
  }, []);

  const handleSubmitButtonClick = () => {
    props.onSubmit(email);
  };

  const handleCloseButtonClick = () => {
    props.onClose();
  };

  const handleEmailTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !errorMessage) {
      props.onSubmit(email);
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
          ref={emailTextFieldRef}
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
      </s.TextFieldContainer>
      {email.length > 0 && errorMessage && (
        <s.ErrorMessage>
          <WarningCircleLargeIcon size={14} color={"currentColor"} />
          {errorMessage}
        </s.ErrorMessage>
      )}
    </s.Container>
  );
};
