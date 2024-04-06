import { ChangeEvent } from "react";

export interface FinishStepProps {
  quickstartURL?: string;
  onSlackLinkClick: () => void;
  onEmailInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  isEmailValid?: boolean;
  isEmailValidating: boolean;
  productKey: string;
  onProductKeyInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
