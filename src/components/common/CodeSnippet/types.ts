export interface CodeSnippetProps {
  text: string;
  language?: string;
}

export interface HighlighterTheme {
  [key: string]: React.CSSProperties;
}
