import { forwardRef, useState } from "react";
import { SLACK_WORKSPACE_URL } from "../../../constants";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { SlackLogoIcon } from "../../common/icons/16px/SlackLogoIcon";
import { DigmaLoginLogo } from "../../common/icons/DigmaLoginLogo";
import { Toggle } from "../../common/v3/Toggle";
import { Login } from "./Login";
import { Registration } from "./Registration";
import * as s from "./styles";

const AuthenticationComponent = () => {
  const [option, setOption] = useState<"login" | "register">("login");
  const [loginSuccessMessage, setLoginSuccessMessage] = useState<string>("");

  const handleSuccessfulRegistration = () => {
    setOption("login");
    setLoginSuccessMessage("Account registered successfully! Please login");
  };

  const handleLogin = () => {
    setLoginSuccessMessage("");
  };

  const handleSlackLinkClick = () => {
    openURLInDefaultBrowser(SLACK_WORKSPACE_URL);
  };

  const handleToggleValueChange = (option: "login" | "register") => {
    setOption(option);
    setLoginSuccessMessage("");
  };

  return (
    <s.Container>
      <s.ContentContainer>
        <s.Header>
          <DigmaLoginLogo />
          <s.Message>
            <s.Title>Welcome to Digma</s.Title>
            <s.Description>
              In order to find issues, analytics and errors in your code, please
              sign in, or register new account
            </s.Description>
          </s.Message>
        </s.Header>
        <s.InputForm>
          <Toggle
            size="large"
            options={[
              {
                label: <s.ToggleOptions>Sign In</s.ToggleOptions>,
                value: "login"
              },
              {
                label: <s.ToggleOptions>Sign Up</s.ToggleOptions>,
                value: "register"
              }
            ]}
            value={option}
            onValueChange={handleToggleValueChange}
          />
          {option === "login" ? (
            <Login successMessage={loginSuccessMessage} onLogin={handleLogin} />
          ) : (
            <Registration
              onSuccessfulRegistration={handleSuccessfulRegistration}
            />
          )}
        </s.InputForm>
      </s.ContentContainer>
      <s.Footer>
        <s.SlackLink onClick={handleSlackLinkClick}>
          <SlackLogoIcon size={16} />
          Join Our Digma Channel
        </s.SlackLink>
      </s.Footer>
    </s.Container>
  );
};

export const Authentication = forwardRef(AuthenticationComponent);
