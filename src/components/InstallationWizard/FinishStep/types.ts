import { ChangeEvent } from "react";

export interface FinishStepProps {
  quickstartURL?: string;
  slackChannelURL: string;
  onEmailInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  isEmailValid?: boolean;
  isEmailValidating: boolean;
}
