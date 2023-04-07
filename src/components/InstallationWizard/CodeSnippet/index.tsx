import copy from "copy-to-clipboard";
import { CopyIcon } from "../../common/icons/CopyIcon";
import * as s from "./styles";
import { CodeSnippetProps } from "./types";

export const CodeSnippet = (props: CodeSnippetProps) => {
  const handleCopyButtonClick = () => {
    copy(props.text);
  };

  return (
    <s.Container disabled={props.disabled}>
      <s.Code>{props.text}</s.Code>
      <s.CopyButton
        onClick={handleCopyButtonClick}
        icon={{
          component: CopyIcon,
          size: 10
        }}
      />
    </s.Container>
  );
};
