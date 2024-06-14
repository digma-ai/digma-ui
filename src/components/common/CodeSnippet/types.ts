import { CSSProperties, ReactNode } from "react";

export interface CodeSnippetProps {
  text: ReactNode;
  language?: string;
  className?: string;
}

export type HighlighterTheme = Record<string, CSSProperties>;
