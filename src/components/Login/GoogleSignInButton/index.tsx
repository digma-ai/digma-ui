import { useGoogleLogin } from "@react-oauth/google";
import { sendTrackingEvent } from "../../../utils/actions/sendTrackingEvent";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { GoogleLogoIcon } from "../../common/icons/20px/GoogleLogoIcon";
import { trackingEvents } from "../tracking";
import * as s from "./styles";
import type { GoogleSignInButtonProps } from "./types";

export const GoogleSignInButton = ({
  onSuccess,
  onError,
  onNonOAuthError
}: GoogleSignInButtonProps) => {
  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (response) => {
      sendTrackingEvent(trackingEvents.GOOGLE_AUTHORIZATION_CODE_RECEIVED);
      onSuccess(response);
    },
    onError: (error) => {
      sendTrackingEvent(trackingEvents.GOOGLE_AUTHORIZATION_CODE_ERROR, {
        error: error.error
      });
      onError(error);
    },
    onNonOAuthError: (error) => {
      sendTrackingEvent(trackingEvents.GOOGLE_AUTHORIZATION_CODE_ERROR, {
        error: error.type
      });
      onNonOAuthError(error);
    }
  });

  const handleClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.SIGN_IN_WITH_GOOGLE_BUTTON_CLICKED
    );
    googleLogin();
  };

  return (
    <s.Button onClick={handleClick}>
      <GoogleLogoIcon size={20} />
      Sign in with Google
    </s.Button>
  );
};
