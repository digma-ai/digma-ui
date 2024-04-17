import { KeyboardEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { isValidPasswordFormat } from "../../../../utils/isPasswordFormatValid";
import { isValidEmailFormat } from "../../../../utils/isValidEmailFormat";
import { TextField } from "../../../common/RegistrationDialog/TextField";
import { LockIcon } from "../../../common/icons/12px/LockIcon";
import { EnvelopeIcon } from "../../../common/icons/16px/EnvelopeIcon";
import { Spinner } from "../../../common/v3/Spinner";
import * as s from "./../styles";
import { Loader } from "./../styles";
import { RegisterFormValues } from "./types";
import { useRegistration } from "./useRegistration";

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

  if (!isValidPasswordFormat(password)) {
    return "Password must contain one special character !@#$%^&*-";
  }

  return true;
};

const formDefaultValues: RegisterFormValues = {
  password: "",
  email: "",
  confirmPassword: ""
};

export const Registration = () => {
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

  const onSubmit = (data: RegisterFormValues) => {
    register({ email: data.email, password: data.password });
    sendUserActionTrackingEvent("registration dialog form submitted");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && isValid) {
      onSubmit(values);
    }
  };

  const errorMessage =
    Object.values(errors).length > 0 ? Object.values(errors)[0].message : "";

  return (
    <s.FormContainer onKeyDown={handleKeyDown}>
      <s.Form
        id={"registrationForm"}
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
              isValid={errors.email ? !errors.email : undefined}
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
              type="password"
              placeholder={"Enter password"}
              isValid={errors.password ? !errors.password : undefined}
              {...field}
              onChange={(args) => {
                if (touchedFields.confirmPassword) {
                  resetField("confirmPassword");
                }
                field.onChange && field.onChange(args);
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
                return "Those passwords didn’t match. Try again.";
              }
              return true;
            }
          }}
          render={({ field }) => (
            <TextField
              icon={LockIcon}
              type="password"
              placeholder={"Repeat your password"}
              isValid={
                errors.confirmPassword ? !errors.confirmPassword : undefined
              }
              {...field}
            />
          )}
        />
      </s.Form>
      {errorMessage && <s.ErrorMessage>{errorMessage}</s.ErrorMessage>}
      {responseStatus && <s.ErrorMessage>{responseStatus}</s.ErrorMessage>}
      {isSucceed && (
        <s.SuccessMessage>User created successfully!</s.SuccessMessage>
      )}
      <s.ButtonsContainer>
        <s.SubmitButton
          isDisabled={!isValid || isLoading}
          label={"Sign Up"}
          type={"submit"}
          form={"registrationForm"}
        />
      </s.ButtonsContainer>
      {isLoading && (
        <Loader>
          <Spinner size={16} />
          Loading...
        </Loader>
      )}
    </s.FormContainer>
  );
};
