import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConfigSelector } from "../../../store/config/useConfigSelector";
import { isString } from "../../../typeGuards/isString";
import type { GoogleAuthHocProps } from "./types";

export const GoogleAuthHoC = ({ children }: GoogleAuthHocProps) => {
  const { googleClientId } = useConfigSelector();

  if (!isString(googleClientId) || !googleClientId.length) {
    return children;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      {children}
    </GoogleOAuthProvider>
  );
};
