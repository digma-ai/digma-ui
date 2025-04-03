import { forwardRef, useEffect, useState } from "react";
import { SLACK_WORKSPACE_URL } from "../../../constants";
import { useResendConfirmationEmailMutation } from "../../../redux/services/digma";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { openURLInDefaultBrowser } from "../../../utils/actions/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../../utils/actions/sendTrackingEvent";
import { SlackLogoIcon } from "../../common/icons/16px/SlackLogoIcon";
import { DigmaLoginLogo } from "../../common/icons/DigmaLoginLogo";
import { Toggle } from "../../common/v3/Toggle";
import { trackingEvents } from "../tracking";
import { AccountActivation } from "./AccountActivation";
import { Login } from "./Login";
import { Registration } from "./Registration";
import * as s from "./styles";

const AuthenticationComponent = () => {
  const [option, setOption] = useState<"login" | "register">("login");
  const [loginSuccessMessage, setLoginSuccessMessage] = useState<string>();
  const [isAccountActivationMessageOpen, setIsAccountActivationMessageOpen] =
    useState(false);
  const [emailToConfirm, setEmailToConfirm] = useState<string>();
  const [resend] = useResendConfirmationEmailMutation();
  const { backendInfo } = useConfigSelector();

  const isEmailConfirmationEnabled =
    backendInfo?.features?.emailVerificationEnabled === "true";

  const handleRegister = (email: string) => {
    setOption("login");

    if (isEmailConfirmationEnabled) {
      setEmailToConfirm(email);
      setIsAccountActivationMessageOpen(true);
    }
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

  const handleAccountActivationMessageClose = () => {
    setIsAccountActivationMessageOpen(false);
    setEmailToConfirm(undefined);
  };

  const handleConfirmationEmailResend = (email: string) => {
    void resend({ email });
  };

  useEffect(() => {
    sendTrackingEvent(trackingEvents.LOGIN_SCREEN_VIEWED);
  }, []);

  return (
    <s.Container>
      <s.Title>Welcome to Digma</s.Title>
      {isAccountActivationMessageOpen && emailToConfirm ? (
        <AccountActivation
          onClose={handleAccountActivationMessageClose}
          emailToConfirm={emailToConfirm}
          onConfirmationEmailResend={handleConfirmationEmailResend}
        />
      ) : (
        <s.ContentContainer>
          <s.Header>
            <DigmaLoginLogo />
            <s.Message>
              In order to find issues, analytics and errors in your code, please
              sign in, or register new account
            </s.Message>
          </s.Header>
          <s.InputForm>
            <Toggle
              size={"large"}
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
              <Login
                onConfirmationEmailResend={handleConfirmationEmailResend}
                successMessage={loginSuccessMessage}
                onLogin={handleLogin}
              />
            ) : (
              <Registration onRegister={handleRegister} />
            )}
          </s.InputForm>
        </s.ContentContainer>
      )}
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
