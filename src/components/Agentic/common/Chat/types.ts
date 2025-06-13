import type { ReactNode } from "react";

export interface ChatProps {
  isInitialLoading: boolean;
  isMessageSending: boolean;
  onMessageSend: (text: string) => void;
  chatContent: ReactNode;
  className?: string;
  promptFontSize?: number; // in pixels
}
