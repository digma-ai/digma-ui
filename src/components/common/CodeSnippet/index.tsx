import copy from "copy-to-clipboard";
import { ForwardedRef, forwardRef, useRef } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { DefaultTheme, useTheme } from "styled-components";
import { isString } from "../../../typeGuards/isString";
import { CopyIcon } from "../icons/16px/CopyIcon";
import { IconButton } from "../v3/IconButton";
import { Tooltip } from "../v3/Tooltip";
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

const CodeSnippetComponent = (
  props: CodeSnippetProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const theme = useTheme();
  const highlighterTheme = getHighlighterTheme(theme);
  const codeRef = useRef<HTMLElement>(null);

  const handleCopyButtonClick = () => {
    if (isString(props.text)) {
      copy(props.text);
    } else if (codeRef.current) {
      copy(codeRef.current.innerText);
    }
  };

  return (
    <s.Container className={props.className} ref={ref}>
      {props.language && isString(props.text) ? (
        <SyntaxHighlighter
          language={props.language}
          style={highlighterTheme}
          customStyle={{
            padding: "6px 0 6px 8px",
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
        <s.Code ref={codeRef}>{props.text}</s.Code>
      )}
      <Tooltip title={"Copy"}>
        <IconButton
          onClick={handleCopyButtonClick}
          icon={{
            component: CopyIcon,
            size: 16
          }}
        />
      </Tooltip>
    </s.Container>
  );
};

export const CodeSnippet = forwardRef(CodeSnippetComponent);
