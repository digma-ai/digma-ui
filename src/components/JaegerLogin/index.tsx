import axios, { isAxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { Helmet } from "react-helmet";
import { TextField } from "../common/v3/TextField";
import * as s from "./styles";

export const JaegerLogin = () => {
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
        let errorMessage = "Unknown error";

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

  return (
    <s.Container>
      <Helmet>
        <title>Digma Jaeger Login</title>
        <meta name={"viewport"} content={"width=device-width"} />
      </Helmet>
      <s.ContentContainer>
        <s.Panel>
          <s.TitleContainer>
            <s.Title>Sign in</s.Title>
            <s.Subtitle>
              Sign in with your Digma credentials for secure access to your
              Jaeger traces.
            </s.Subtitle>
          </s.TitleContainer>
          <s.Form onSubmit={handleSubmit}>
            <TextField
              placeholder={"Email address"}
              type={"text"}
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              placeholder={"Password"}
              type={"password"}
              value={password}
              onChange={handlePasswordChange}
            />
            <s.SignInButton
              type={"submit"}
              label={"Sign in"}
              isDisabled={Boolean(!username || !password)}
            />
          </s.Form>
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
