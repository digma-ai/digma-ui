import { ReactNode } from "react";

export interface CodeSnippetProps {
  text: ReactNode;
  language?: string;
  className?: string;
}

export interface HighlighterTheme {
  [key: string]: React.CSSProperties;
}
