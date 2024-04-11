import { KeyboardEvent, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { TextField } from "../../../common/RegistrationDialog/TextField";
import { LockIcon } from "../../../common/icons/12px/LockIcon";
import { EnvelopeIcon } from "../../../common/icons/16px/EnvelopeIcon";
import * as s from "./../styles";
import { RegisterFormValues } from "./types";
import { useRegistration } from "./useRegistration";

const validateEmail = (email: string): string | boolean => {
  const emailMessage = "Please enter a valid email address";

  if (email.length === 0) {
    return emailMessage;
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
    formState: { errors, isValid },
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

  useEffect(() => {
    if (resultErrors?.length > 0) {
      setError("root", {
        type: "validate",
        message: resultErrors.map((x) => x.description).join("\r\n")
      });
    }
  }, [setError, resultErrors]);

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  useEffect(() => {
    watch(() => {
      clearErrors();
    });
  }, [clearErrors, watch]);

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
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <TextField
              icon={LockIcon}
              type="password"
              placeholder={"Enter password"}
              isValid={errors.password ? !errors.password : undefined}
              {...field}
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
      {isSucceed && (
        <s.SuccessMessage>User created successfully!</s.SuccessMessage>
      )}
      <s.ButtonsContainer>
        <s.SubmitButton
          isDisabled={!isValid}
          label={"Sign Up"}
          type={"submit"}
          form={"registrationForm"}
        />
      </s.ButtonsContainer>
    </s.FormContainer>
  );
};
