import type { CodeResponse, NonOAuthError } from "@react-oauth/google";

export interface GoogleSignInButtonProps {
  onSuccess: (
    response: Omit<CodeResponse, "error" | "error_description" | "error_uri">
  ) => void;
  onError: (
    response: Pick<CodeResponse, "error" | "error_description" | "error_uri">
  ) => void;
  onNonOAuthError: (error: NonOAuthError) => void;
}
