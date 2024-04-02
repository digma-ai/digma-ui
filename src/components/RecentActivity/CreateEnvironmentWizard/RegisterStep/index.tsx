import { KeyboardEvent, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { actions as globalActions } from "../../../../actions";
import { usePrevious } from "../../../../hooks/usePrevious";
import { isValidEmailFormat } from "../../../../utils/isValidEmailFormat";
import { sendTrackingEvent } from "../../../../utils/sendTrackingEvent";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { EnvelopeIcon } from "../../../common/icons/16px/EnvelopeIcon";
import { UserIcon } from "../../../common/icons/UserIcon";
import { trackingEvents } from "../../tracking";
import { isWorkEmail } from "./isWorkEmail";
import * as s from "./styles";
import { RegisterStepProps, RegistrationFormValues } from "./types";

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

export const RegisterStep = (props: RegisterStepProps) => {
  const [isRegistrationInProgress, setIsRegistrationInProgress] =
    useState(false);
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
    setFocus
  } = useForm<RegistrationFormValues>({
    mode: "onChange",
    defaultValues: formDefaultValues
  });
  const values = getValues();
  const config = useContext(ConfigContext);
  const previousUserRegistrationEmail = usePrevious(
    config.userRegistrationEmail
  );

  useEffect(() => {
    if (
      previousUserRegistrationEmail !== config.userRegistrationEmail &&
      isRegistrationInProgress
    ) {
      setIsRegistrationInProgress(false);
    }
  }, [
    config.userRegistrationEmail,
    isRegistrationInProgress,
    previousUserRegistrationEmail
  ]);

  useEffect(() => {
    setFocus("fullName");
  }, [setFocus]);

  const onSubmit = (data: RegistrationFormValues) => {
    sendTrackingEvent(trackingEvents.REGISTRATION_FORM_SUBMITTED);
    window.sendMessageToDigma({
      action: globalActions.REGISTER,
      payload: {
        ...data,
        ...{
          scope: "recent activity"
        }
      }
    });
    setIsRegistrationInProgress(true);
    props.onNext(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && isValid) {
      onSubmit(values);
    }
  };

  return (
    <s.Container onKeyDown={handleKeyDown}>
      <s.Description>
        <s.Header>Register</s.Header>
        Please register with your email address
      </s.Description>
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
            <s.TextInput
              icon={UserIcon}
              placeholder={"Enter your full name"}
              isInvalid={!!errors.fullName}
              error={errors.fullName?.message}
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
            <s.TextInput
              icon={EnvelopeIcon}
              placeholder={"Enter your email"}
              isInvalid={!!errors.email}
              error={errors.email?.message}
              {...field}
            />
          )}
        />
        <s.SubmitButton
          isDisabled={!isValid || isRegistrationInProgress}
          label={"Submit"}
          type={"submit"}
          form={"registrationForm"}
        />
        {isRegistrationInProgress && <s.Loader />}
      </s.Form>
    </s.Container>
  );
};
