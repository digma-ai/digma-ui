import copy from "copy-to-clipboard";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { DefaultTheme, useTheme } from "styled-components";
import { CopyIcon } from "../icons/CopyIcon";
import * as s from "./styles";
import { CodeSnippetProps, HighlighterTheme } from "./types";

const getHighlighterTheme = (theme: DefaultTheme): HighlighterTheme => {
  switch (theme.mode) {
    case "light":
      return atomOneLight as HighlighterTheme;
    case "dark":
    case "dark-jetbrains":
      return atomOneDark as HighlighterTheme;
  }
};

export const CodeSnippet = (props: CodeSnippetProps) => {
  const theme = useTheme();
  const highlighterTheme = getHighlighterTheme(theme);

  const handleCopyButtonClick = () => {
    copy(props.text);
  };

  return (
    <s.Container>
      {props.language ? (
        <SyntaxHighlighter
          language={props.language}
          style={highlighterTheme}
          customStyle={{
            padding: 0,
            color: "inherit",
            background: "none"
          }}
          CodeTag={s.Code}
          wrapLongLines={true}
          PreTag={"div"}
        >
          {props.text}
        </SyntaxHighlighter>
      ) : (
        <s.Code>{props.text}</s.Code>
      )}
      <s.CopyButton
        onClick={handleCopyButtonClick}
        icon={{
          component: CopyIcon
        }}
      />
    </s.Container>
  );
};
