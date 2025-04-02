import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { LockIcon } from "../../../common/icons/12px/LockIcon";
import { EnvelopeIcon } from "../../../common/icons/16px/EnvelopeIcon";
import { Spinner } from "../../../common/v3/Spinner";
import { TextField } from "../../../common/v3/TextField";
import { Agreement } from "../Agreement";
import {
  ButtonsContainer,
  ErrorMessage,
  Form,
  FormContainer,
  Loader,
  SubmitButton
} from "../styles";
import * as s from "./styles";
import type { LoginFormValues, LoginProps } from "./types";
import { useLogin } from "./useLogin";

const FORM_ID = "loginForm";

const formDefaultValues: LoginFormValues = {
  password: "",
  email: ""
};

export const Login = ({
  successMessage,
  onLogin,
  onConfirmationEmailResend
}: LoginProps) => {
  const {
    handleSubmit,
    control,
    clearErrors,
    watch,
    setError,
    getValues,
    formState: { errors, isValid },
    setFocus
  } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: formDefaultValues
  });
  const { isLoading, login, error, isSucceed } = useLogin();

  const values = getValues();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  useEffect(() => {
    if (error) {
      setError("root", {
        type: "validate",
        message: error.description
      });
    }
  }, [setError, error]);

  useEffect(() => {
    watch(() => {
      clearErrors();
    });
  }, [clearErrors, watch]);

  const onSubmit = (data: LoginFormValues) => {
    onLogin();
    login({ email: data.email, password: data.password });
    sendUserActionTrackingEvent("login form submitted");
  };

  const handleResendVerificationEmailLinkClick = () => {
    onConfirmationEmailResend(values.email);
    sendUserActionTrackingEvent("resend verification email");
  };

  const errorMessage =
    Object.values(errors).length > 0 ? Object.values(errors)[0].message : "";

  const isUserIsNotActivatedError = errorMessage?.includes(
    "user has not yet been activated"
  );

  return (
    <FormContainer>
      <Form
        id={FORM_ID}
        onSubmit={(e) => {
          e.preventDefault();
          void handleSubmit(onSubmit)(e);
        }}
      >
        <Controller
          name={"email"}
          control={control}
          rules={{ required: "Email is required" }}
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
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <TextField
              icon={LockIcon}
              type={"password"}
              placeholder={"Enter password"}
              isInvalid={Boolean(errors.password)}
              {...field}
            />
          )}
        />
      </Form>
      {errorMessage && !isUserIsNotActivatedError && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
      <ButtonsContainer>
        <SubmitButton
          isDisabled={
            (!isValid && !isUserIsNotActivatedError) || isLoading || isSucceed
          }
          label={"Sign In"}
          type={"submit"}
          form={FORM_ID}
        />
      </ButtonsContainer>
      {successMessage && <s.SuccessMessage>{successMessage}</s.SuccessMessage>}
      <Agreement />
      {isLoading && (
        <Loader>
          <Spinner size={16} />
          Loading...
        </Loader>
      )}
      {isUserIsNotActivatedError && (
        <s.UserIsNotActivatedErrorMessageContainer>
          <ErrorMessage>
            Your user has not yet been activated, please check your email
          </ErrorMessage>
          <s.ResendVerificationEmailLink
            onClick={handleResendVerificationEmailLinkClick}
          >
            Resend verification email
          </s.ResendVerificationEmailLink>
        </s.UserIsNotActivatedErrorMessageContainer>
      )}
      <s.ForgotPasswordMessage>
        Forgot password? Contact the Digma admin
      </s.ForgotPasswordMessage>
    </FormContainer>
  );
};
