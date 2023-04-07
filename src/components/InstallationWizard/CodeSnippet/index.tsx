import copy from "copy-to-clipboard";
import { useTheme } from "styled-components";
import { CopyIcon } from "../../common/icons/CopyIcon";
import * as s from "./styles";
import { CodeSnippetProps } from "./types";

export const CodeSnippet = (props: CodeSnippetProps) => {
  const theme = useTheme();

  const handleCopyButtonClick = () => {
    copy(props.text);
  };

  return (
    <s.Container disabled={props.disabled}>
      <s.Code>{props.text}</s.Code>
      <s.CopyButton onClick={handleCopyButtonClick}>
        <CopyIcon
          size={10}
          color={theme.mode === "light" ? "#7891d0" : "#b9c2eb"}
        />
      </s.CopyButton>
    </s.Container>
  );
};
