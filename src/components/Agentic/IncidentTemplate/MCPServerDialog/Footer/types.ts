import type { ReactNode } from "react";

export interface FooterProps {
  isLoading?: boolean;
  loadingMessage?: string;
  errorMessage?: string;
  buttons: ReactNode;
}
