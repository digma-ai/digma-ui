import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { actions as globalActions } from "../../../../actions";
import { usePrevious } from "../../../../hooks/usePrevious";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { isValidEmailFormat } from "../../../../utils/isValidEmailFormat";
import { isWorkEmail } from "../../../../utils/isWorkEmail";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { EnvelopeIcon } from "../../../common/icons/16px/EnvelopeIcon";
import { UserIcon } from "../../../common/icons/UserIcon";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import type { RegisterStepProps, RegistrationFormValues } from "./types";

const FORM_ID = "registrationForm";

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

export const RegisterStep = ({ onNext }: RegisterStepProps) => {
  const [isRegistrationInProgress, setIsRegistrationInProgress] =
    useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    setFocus
  } = useForm<RegistrationFormValues>({
    mode: "onChange",
    defaultValues: formDefaultValues
  });
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
    sendUserActionTrackingEvent(
      trackingEvents.LOCAL_REGISTRATION_FORM_SUBMITTED
    );
    window.sendMessageToDigma({
      action: globalActions.PERSONALIZE_REGISTER,
      payload: {
        ...data,
        ...{
          scope: "recent activity"
        }
      }
    });
    setIsRegistrationInProgress(true);
    onNext(true);
  };

  return (
    <s.Container>
      <s.Description>
        <s.Header>Register</s.Header>
        Please register with your email address
      </s.Description>
      <s.Form
        id={FORM_ID}
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
              isInvalid={Boolean(errors.fullName)}
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
              isInvalid={Boolean(errors.email)}
              error={errors.email?.message}
              {...field}
            />
          )}
        />
        <s.SubmitButton
          isDisabled={!isValid || isRegistrationInProgress}
          label={"Submit"}
          type={"submit"}
          form={FORM_ID}
        />
        {isRegistrationInProgress && <s.Loader />}
      </s.Form>
    </s.Container>
  );
};
