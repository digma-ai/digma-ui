import type { FormEventHandler } from "react";
import { useContext, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { actions as globalActions } from "../../../actions";
import { isValidEmailFormat } from "../../../utils/isValidEmailFormat";
import { isWorkEmail } from "../../../utils/isWorkEmail";
import { ConfigContext } from "../App/ConfigContext";
import { EnvelopeIcon } from "../icons/16px/EnvelopeIcon";
import { UserIcon } from "../icons/UserIcon";
import * as s from "./styles";
import type {
  RegisterFromProps as RegisterFormProps,
  RegistrationFormValues
} from "./types";

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

export const RegisterForm = ({
  onNext,
  submitBtnText,
  scope,
  className,
  alwaysRenderError,
  emailPlaceholder,
  fullNamePlaceholder
}: RegisterFormProps) => {
  const config = useContext(ConfigContext);

  const formDefaultValues: RegistrationFormValues = useMemo(
    () => ({
      fullName: "",
      email: config.userRegistrationEmail
    }),
    [config.userRegistrationEmail]
  );
  const {
    handleSubmit,
    control,
    formState: { errors, isValid }
  } = useForm<RegistrationFormValues>({
    mode: "onChange",
    defaultValues: formDefaultValues
  });

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
    onNext(true);
  };

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    void handleSubmit(onSubmit)(e);
  };

  return (
    <s.Container className={className}>
      <s.Form id={FORM_ID} onSubmit={handleOnSubmit}>
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
        isDisabled={!isValid}
        label={submitBtnText ?? "Submit"}
        type={"submit"}
        form={FORM_ID}
      />
    </s.Container>
  );
};
