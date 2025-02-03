import type { CodeResponse } from "@react-oauth/google";
import axios, { isAxiosError } from "axios";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { isString } from "../../typeGuards/isString";
import { sendErrorTrackingEvent } from "../../utils/actions/sendErrorTrackingEvent";
import { sendUserActionTrackingEvent } from "../../utils/actions/sendUserActionTrackingEvent";
import { TextField } from "../common/v3/TextField";
import { GoogleSignInButton } from "./GoogleSignInButton";
import * as s from "./styles";
import { trackingEvents } from "./tracking";

const reportError = (error: Error) => {
  if (isAxiosError(error)) {
    sendErrorTrackingEvent(error, {
      "request.url": error.config?.url,
      severity: "high",
      "error.source":
        error.response &&
        error.response.status >= 500 &&
        error.response.status < 600
          ? "backend"
          : "ui"
    });
  } else {
    sendErrorTrackingEvent(error, {
      severity: "high"
    });
  }
};

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    sendUserActionTrackingEvent(trackingEvents.SIGN_IN_FORM_SUBMITTED);
    e.preventDefault();

    axios
      .post("/auth/login", {
        username,
        password
      })
      .then(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get("return_url");
        if (returnUrl) {
          window.location.href = returnUrl;
        }
      })
      .catch((error: Error) => {
        reportError(error);

        let errorMessage = "Failed to sign in";

        if (isAxiosError(error)) {
          if (error.response) {
            switch (error.response.status) {
              case 401:
                errorMessage = "Invalid username or password";
                break;
            }
          }
        } else {
          errorMessage = error.message;
        }

        setError(errorMessage);
      });
  };

  const handleGoogleSignInSuccess = (
    response: Omit<CodeResponse, "error" | "error_description" | "error_uri">
  ) => {
    axios
      .post("/auth/google", {
        code: response.code
      })
      .then(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get("return_url");
        if (returnUrl) {
          window.location.href = returnUrl;
        }
      })
      .catch((error: Error) => {
        reportError(error);
        // eslint-disable-next-line no-console
        console.error(error);
        setError("Failed to sign in with Google");
      });
  };

  const handleGoogleSignInError = () => {
    setError("Failed to sign in with Google");
  };

  return (
    <s.Container>
      <Helmet>
        <title>Digma login</title>
        <meta name={"viewport"} content={"width=device-width"} />
      </Helmet>
      <s.ContentContainer>
        <s.Panel>
          <s.TitleContainer>
            <s.Title>Sign in</s.Title>
            <s.Subtitle>Sign in with your Digma credentials</s.Subtitle>
          </s.TitleContainer>
          <s.Form onSubmit={handleSubmit}>
            <TextField
              placeholder={"Email address"}
              type={"text"}
              value={username}
              onChange={handleUsernameChange}
              autoComplete={"email"}
            />
            <TextField
              placeholder={"Password"}
              type={"password"}
              value={password}
              onChange={handlePasswordChange}
              autoComplete={"current-password"}
            />
            <s.SignInButton
              type={"submit"}
              label={"Sign in"}
              isDisabled={Boolean(!username || !password)}
            />
          </s.Form>
          {isString(window.googleClientId) &&
            window.googleClientId.length > 0 && (
              <>
                <s.SignInSeparator>
                  <s.Divider />
                  or
                  <s.Divider />
                </s.SignInSeparator>
                <GoogleSignInButton
                  onSuccess={handleGoogleSignInSuccess}
                  onError={handleGoogleSignInError}
                  onNonOAuthError={handleGoogleSignInError}
                />
              </>
            )}
          <s.Footer>
            <s.FooterText>By signing in you agree with</s.FooterText>
            <s.TermsLink
              href={"https://digma.ai/terms-of-use/"}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              Terms & Privacy Policy
            </s.TermsLink>
          </s.Footer>
          <s.ErrorText>{error}</s.ErrorText>
        </s.Panel>
      </s.ContentContainer>
    </s.Container>
  );
};
