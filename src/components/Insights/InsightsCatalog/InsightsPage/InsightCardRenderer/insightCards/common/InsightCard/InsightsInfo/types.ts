import type { ReactElement } from "react";

export interface InsightsInfoProps {
  isOpen?: boolean;
  children: ReactElement;
  description?: () => JSX.Element;
  onClose: () => void;
  documentationLink?: string | null;
}
