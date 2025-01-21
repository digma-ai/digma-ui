import { useGoogleLogin } from "@react-oauth/google";
import { GoogleLogoIcon } from "../../common/icons/20px/GoogleLogoIcon";
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
      onSuccess(response);
    },
    onError: (error) => {
      onError(error);
    },
    onNonOAuthError: (error) => {
      onNonOAuthError(error);
    }
  });

  const handleClick = () => {
    googleLogin();
  };

  return (
    <s.Button onClick={handleClick}>
      <GoogleLogoIcon size={20} />
      Sign in with Google
    </s.Button>
  );
};
