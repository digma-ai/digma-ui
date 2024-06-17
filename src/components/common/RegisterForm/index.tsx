import {
  ForwardedRef,
  KeyboardEvent,
  forwardRef,
  useContext,
  useEffect,
  useState
} from "react";
import { Controller, useForm } from "react-hook-form";

import { actions as globalActions } from "../../../actions";
import { usePrevious } from "../../../hooks/usePrevious";
import { isValidEmailFormat } from "../../../utils/isValidEmailFormat";
import { ConfigContext } from "../App/ConfigContext";
import { EnvelopeIcon } from "../icons/16px/EnvelopeIcon";
import { UserIcon } from "../icons/UserIcon";
import { isWorkEmail } from "./isWorkEmail";
import * as s from "./styles";
import { RegisterFromProps, RegistrationFormValues } from "./types";

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

const RegisterFromComponent = (
  {
    onNext,
    submitBtnText,
    scope,
    className,
    alwaysRenderError,
    emailPlaceholder,
    fullNamePlaceholder
  }: RegisterFromProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
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
      onNext(true);
    }
  }, [
    config.userRegistrationEmail,
    isRegistrationInProgress,
    previousUserRegistrationEmail,
    onNext
  ]);

  useEffect(() => {
    setFocus("fullName");
  }, [setFocus]);

  const onSubmit = (data: RegistrationFormValues) => {
    window.sendMessageToDigma({
      action: globalActions.PERSONALIZE_REGISTER,
      payload: {
        ...data,
        ...{
          scope: scope
        }
      }
    });
    setIsRegistrationInProgress(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && isValid) {
      onSubmit(values);
    }
  };

  return (
    <s.Container className={className} onKeyDown={handleKeyDown} ref={ref}>
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
              placeholder={fullNamePlaceholder ?? "Full name"}
              isInvalid={Boolean(errors.fullName)}
              error={errors.fullName?.message}
              alwaysRenderError={alwaysRenderError}
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
              placeholder={emailPlaceholder ?? "Your email"}
              isInvalid={Boolean(errors.email)}
              error={errors.email?.message}
              alwaysRenderError={alwaysRenderError}
              {...field}
            />
          )}
        />
      </s.Form>
      <s.SubmitButton
        isDisabled={!isValid || isRegistrationInProgress}
        label={submitBtnText ?? "Submit"}
        type={"submit"}
        form={"registrationForm"}
      />
      {isRegistrationInProgress && <s.Loader />}
    </s.Container>
  );
};

export const RegisterFrom = forwardRef(RegisterFromComponent);
