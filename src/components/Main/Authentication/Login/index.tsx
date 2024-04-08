import { KeyboardEvent, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { isValidEmailFormat } from "../../../../utils/isValidEmailFormat";
import { TextField } from "../../../common/RegistrationDialog/TextField"; // TODO: change when new env will be merged
import { LockIcon } from "../../../common/icons/12px/LockIcon";
import { EnvelopeIcon } from "../../../common/icons/16px/EnvelopeIcon";
import {
  ButtonsContainer,
  ErrorMessage,
  Form,
  FormContainer,
  InfoMessage,
  SubmitButton
} from "../styles";
import { LoginFormValues } from "./types";

const validateEmail = (email: string): string | boolean => {
  const emailMessage = "Please enter a valid work email address";

  if (email.length === 0) {
    return emailMessage;
  }

  if (!isValidEmailFormat(email)) {
    return emailMessage;
  }

  return true;
};

const formDefaultValues: LoginFormValues = {
  password: "",
  email: ""
};

export const Login = () => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
    setFocus
  } = useForm<LoginFormValues>({
    mode: "onChange",
    defaultValues: formDefaultValues
  });
  const values = getValues();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit = (data: LoginFormValues) => {
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
        />{" "}
      </Form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <ButtonsContainer>
        <SubmitButton
          isDisabled={!isValid}
          label={"Sign In"}
          type={"submit"}
          form={"loginForm"}
        />
      </ButtonsContainer>
      <InfoMessage>Forgot password? Contact the Digma admin</InfoMessage>
    </FormContainer>
  );
};
