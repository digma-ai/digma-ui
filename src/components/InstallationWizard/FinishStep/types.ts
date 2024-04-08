import { ChangeEvent } from "react";
import { FieldsErrors } from "../types";

export interface FinishStepProps {
  quickstartURL?: string;
  onSlackLinkClick: () => void;
  onEmailInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  email: string;
  isEmailValid?: boolean;
  isEmailValidating: boolean;
  productKey: string;
  onProductKeyInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errors: FieldsErrors;
}
