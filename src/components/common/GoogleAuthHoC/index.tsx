import { GoogleOAuthProvider } from "@react-oauth/google";
import type { GoogleAuthHoCProps } from "./types";

export const GoogleAuthHoC = ({ children, clientId }: GoogleAuthHoCProps) => {
  if (!clientId?.length) {
    return children;
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
};
