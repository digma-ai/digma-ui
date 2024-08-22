import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { isValidEmailFormat } from "../../../utils/isValidEmailFormat";
import { NewCircleLoader } from "../NewCircleLoader";
import { EnvelopeIcon } from "../icons/16px/EnvelopeIcon";
import { CrossIcon } from "../icons/CrossIcon";
import { UserIcon } from "../icons/UserIcon";
import { TextField } from "./TextField";
import { isWorkEmail } from "./isWorkEmail";
import * as s from "./styles";
import { trackingEvents } from "./tracking";
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
    formState: { errors, isValid, touchedFields },
    setFocus
  } = useForm<RegistrationFormValues>({
    mode: "onChange",
    defaultValues: formDefaultValues
  });

  useEffect(() => {
    setFocus("fullName");
  }, [setFocus]);

  const onSubmit = (data: RegistrationFormValues) => {
    props.onSubmit({
      fullName: data.fullName.trim(),
      email: data.email
    });
    sendUserActionTrackingEvent(
      trackingEvents.REGISTRATION_DIALOG_FORM_SUBMITTED
    );
  };

  const handleCloseButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.REGISTRATION_DIALOG_CLOSE_BUTTON_CLICKED
    );
    props.onClose();
  };

  const errorMessage =
    Object.values(errors).length > 0 ? Object.values(errors)[0].message : "";

  return (
    <s.Container>
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
                touchedFields.fullName ?? errors.fullName
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
                touchedFields.email ?? errors.email ? !errors.email : undefined
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
