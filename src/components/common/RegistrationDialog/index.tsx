import { KeyboardEvent, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { isValidEmailFormat } from "../../../utils/isValidEmailFormat";
import { sendTrackingEvent } from "../../../utils/sendTrackingEvent";
import { NewCircleLoader } from "../NewCircleLoader";
import { EnvelopeIcon } from "../icons/16px/EnvelopeIcon";
import { CrossIcon } from "../icons/CrossIcon";
import { UserIcon } from "../icons/UserIcon";
import { TextField } from "./TextField";
import { isWorkEmail } from "./isWorkEmail";
import * as s from "./styles";
import { RegistrationDialogProps, RegistrationFormValues } from "./types";

const validateEmail = (email: string): string | boolean => {
  const emailMessage = "Please enter a valid work email address";

  if (email.length === 0) {
    return emailMessage;
  }

  if (!isValidEmailFormat(email)) {
    return emailMessage;
  }

  if (!isWorkEmail(email)) {
    return emailMessage;
  }

  return true;
};

const formDefaultValues: RegistrationFormValues = {
  fullName: "",
  email: ""
};

export const RegistrationDialog = (props: RegistrationDialogProps) => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid, touchedFields },
    setFocus
  } = useForm<RegistrationFormValues>({
    mode: "onChange",
    defaultValues: formDefaultValues
  });
  const values = getValues();

  useEffect(() => {
    setFocus("fullName");
  }, [setFocus]);

  const onSubmit = (data: RegistrationFormValues) => {
    props.onSubmit({
      fullName: data.fullName.trim(),
      email: data.email
    });
    sendTrackingEvent("registration dialog form submitted");
  };

  const handleCloseButtonClick = () => {
    sendTrackingEvent("registration dialog close button clicked");
    props.onClose();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && isValid) {
      onSubmit(values);
    }
  };

  const errorMessage =
    Object.values(errors).length > 0 ? Object.values(errors)[0].message : "";

  return (
    <s.Container onKeyDown={handleKeyDown}>
      <s.Header>
        <s.Title>Register</s.Title>
        <s.CloseButton onClick={handleCloseButtonClick}>
          <CrossIcon color={"currentColor"} size={14} />
        </s.CloseButton>
      </s.Header>
      Please register with your email address
      <s.Form
        id={"registrationForm"}
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit(onSubmit)(e);
        }}
      >
        <Controller
          name={"fullName"}
          control={control}
          defaultValue={formDefaultValues.fullName}
          rules={{ required: "Name is required" }}
          render={({ field }) => (
            <TextField
              icon={UserIcon}
              placeholder={"Enter your full name"}
              isValid={
                touchedFields.fullName || errors.fullName
                  ? !errors.fullName
                  : undefined
              }
              {...field}
            />
          )}
        />
        <Controller
          name={"email"}
          control={control}
          rules={{ required: "Email is required", validate: validateEmail }}
          defaultValue={formDefaultValues.email}
          render={({ field }) => (
            <TextField
              icon={EnvelopeIcon}
              placeholder={"Enter your email"}
              isValid={
                touchedFields.email || errors.email ? !errors.email : undefined
              }
              {...field}
            />
          )}
        />
      </s.Form>
      <s.ErrorMessage>{errorMessage}</s.ErrorMessage>
      <s.ButtonsContainer>
        {props.isRegistrationInProgress && (
          <s.CircleLoaderContainer>
            <NewCircleLoader size={18} />
          </s.CircleLoaderContainer>
        )}
        <s.SubmitButton
          disabled={!isValid || props.isRegistrationInProgress}
          label={"Submit"}
          size={"large"}
          type={"submit"}
          form={"registrationForm"}
        />
      </s.ButtonsContainer>
    </s.Container>
  );
};
