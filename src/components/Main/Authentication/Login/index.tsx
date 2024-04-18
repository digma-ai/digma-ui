import { KeyboardEvent, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { TextField } from "../../../common/RegistrationDialog/TextField"; // TODO: change when new env will be merged
import { LockIcon } from "../../../common/icons/12px/LockIcon";
import { EnvelopeIcon } from "../../../common/icons/16px/EnvelopeIcon";
import { Spinner } from "../../../common/v3/Spinner";
import {
  ButtonsContainer,
  ErrorMessage,
  Form,
  FormContainer,
  InfoMessage,
  Loader,
  SubmitButton
} from "../styles";
import * as s from "./../styles";
import { LoginFormValues, LoginProps } from "./types";
import { useLogin } from "./useLogin";

const formDefaultValues: LoginFormValues = {
  password: "",
  email: ""
};

export const Login = ({ successMessage, onLogin }: LoginProps) => {
  const {
    handleSubmit,
    control,
    getValues,
    clearErrors,
    watch,
    setError,
    formState: { errors, isValid },
    setFocus
  } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: formDefaultValues
  });
  const values = getValues();
  const { isLoading, login, error } = useLogin();

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
    <FormContainer onKeyDown={handleKeyDown}>
      <Form
        id={"loginForm"}
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
      </Form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <ButtonsContainer>
        <SubmitButton
          isDisabled={!isValid || isLoading}
          label={"Sign In"}
          type={"submit"}
          form={"loginForm"}
        />
      </ButtonsContainer>
      {successMessage && (
        <s.SuccessMessage>
          Account registered successfully. Please login
        </s.SuccessMessage>
      )}
      <InfoMessage>Forgot password? Contact the Digma admin</InfoMessage>
      {isLoading && (
        <Loader>
          <Spinner size={16} />
          Loading...
        </Loader>
      )}
    </FormContainer>
  );
};