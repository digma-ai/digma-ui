export interface CodeSnippetProps {
  text: string;
  language?: string;
  className?: string;
}

export interface HighlighterTheme {
  [key: string]: React.CSSProperties;
}
