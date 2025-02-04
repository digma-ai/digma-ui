import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { isAlphanumeric } from "../../../../utils/isAlphanumeric";
import { isValidEmailFormat } from "../../../../utils/isValidEmailFormat";
import { LockIcon } from "../../../common/icons/12px/LockIcon";
import { EnvelopeIcon } from "../../../common/icons/16px/EnvelopeIcon";
import { Spinner } from "../../../common/v3/Spinner";
import { TextField } from "../../../common/v3/TextField";
import * as s from "../styles";
import type { RegisterFormValues, RegistrationProps } from "./types";
import { useRegistration } from "./useRegistration";

const FORM_ID = "registrationForm";

const validateEmail = (email: string): string | boolean => {
  const emailMessage = "Please enter a valid email address";

  if (email.length === 0) {
    return emailMessage;
  }

  if (!isValidEmailFormat(email)) {
    return emailMessage;
  }

  return true;
};

const validatePassword = (password: string): string | boolean => {
  if (password.length < 6) {
    return "Password must be at least 6.";
  }

  if (isAlphanumeric(password)) {
    return "Password must contain one special character";
  }

  return true;
};

const formDefaultValues: RegisterFormValues = {
  password: "",
  email: "",
  confirmPassword: ""
};

export const Registration = ({ onRegister }: RegistrationProps) => {
  const {
    handleSubmit,
    control,
    getValues,
    watch,
    setError,
    clearErrors,
    resetField,
    formState: { errors, isValid, touchedFields },
    setFocus
  } = useForm<RegisterFormValues>({
    mode: "onChange",
    defaultValues: formDefaultValues
  });
  const values = getValues();
  const {
    isLoading,
    isSucceed,
    register,
    errors: resultErrors
  } = useRegistration();

  const [responseStatus, setResponseStatus] = useState<string>();

  useEffect(() => {
    if (resultErrors?.length > 0) {
      setResponseStatus(resultErrors.map((x) => x.description).join("\n"));
    }
  }, [setError, resultErrors]);

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  useEffect(() => {
    watch(() => {
      setResponseStatus(undefined);
    });
  }, [clearErrors, watch, setResponseStatus]);

  useEffect(() => {
    if (isSucceed) {
      onRegister();
    }
  }, [isSucceed, onRegister]);

  const onSubmit = (data: RegisterFormValues) => {
    register({ email: data.email, password: data.password });
    sendUserActionTrackingEvent("registration form submitted");
  };

  const errorMessage =
    Object.values(errors).length > 0 ? Object.values(errors)[0].message : "";

  return (
    <s.FormContainer>
      <s.Form
        id={FORM_ID}
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit(onSubmit)(e);
        }}
      >
        <Controller
          name={"email"}
          control={control}
          rules={{ required: "Email is required", validate: validateEmail }}
          defaultValue={formDefaultValues.email}
          render={({ field }) => (
            <TextField
              icon={EnvelopeIcon}
              placeholder={"Enter your email"}
              isInvalid={Boolean(errors.email)}
              {...field}
            />
          )}
        />
        <Controller
          name={"password"}
          control={control}
          defaultValue={""}
          rules={{
            required: "Password is required",
            validate: validatePassword
          }}
          render={({ field }) => (
            <TextField
              icon={LockIcon}
              type={"password"}
              placeholder={"Enter password"}
              isInvalid={Boolean(errors.password)}
              {...field}
              onChange={(args) => {
                if (touchedFields.confirmPassword) {
                  resetField("confirmPassword");
                }
                if (field.onChange) {
                  field.onChange(args);
                }
              }}
            />
          )}
        />
        <Controller
          name={"confirmPassword"}
          control={control}
          defaultValue={""}
          rules={{
            required: "Confirm your password",
            validate: (repeat: string) => {
              if (repeat?.length === 0) {
                return "Confirm your password";
              }
              if (repeat !== values.password) {
                return "Those passwords didn't match. Try again.";
              }
              return true;
            }
          }}
          render={({ field }) => (
            <TextField
              icon={LockIcon}
              type={"password"}
              placeholder={"Repeat your password"}
              isInvalid={Boolean(errors.confirmPassword)}
              {...field}
            />
          )}
        />
      </s.Form>
      {errorMessage && <s.ErrorMessage>{errorMessage}</s.ErrorMessage>}
      {responseStatus && <s.ErrorMessage>{responseStatus}</s.ErrorMessage>}
      <s.ButtonsContainer>
        <s.SubmitButton
          isDisabled={!isValid || isLoading}
          label={"Sign Up"}
          type={"submit"}
          form={FORM_ID}
        />
      </s.ButtonsContainer>
      {isLoading && (
        <s.Loader>
          <Spinner size={16} />
          Loading...
        </s.Loader>
      )}
    </s.FormContainer>
  );
};
