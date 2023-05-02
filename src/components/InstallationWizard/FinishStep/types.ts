import { ChangeEvent } from "react";

export interface FinishStepProps {
  quickstartURL?: string;
  slackChannelURL: string;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  emailErrorMessage?: string;
}
