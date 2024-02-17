import { ForwardedRef, forwardRef } from "react";
import { CodeIcon } from "../../common/icons/16px/CodeIcon";
import { CodeIconGradient } from "../../common/icons/16px/CodeIconGradient";
import { IconButton } from "../IconButton";
import * as s from "./styles";
import { CodeButtonProps } from "./types";

// const hasNoData = (codeContext: CodeContext): boolean =>
//   [null, true].includes(codeContext.isInstrumented) &&
//   codeContext.spans.assets.length === 0;

// const hasData = (codeContext: CodeContext): boolean =>
//   [null, true].includes(codeContext.isInstrumented) &&
//   codeContext.spans.assets.length > 0;

// const hasNoObservability = (codeContext: CodeContext): boolean =>
//   codeContext.isInstrumented === false;

// const isDisabled = (codeContext: CodeContext): boolean =>
//   !codeContext || codeContext.methodId === null;

const CodeButtonComponent = (
  props: CodeButtonProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const icon = props.hasObservability ? (
    props.hasData ? (
      <CodeIconGradient gradient={"purple"} size={16} />
    ) : (
      <CodeIconGradient gradient={"orange"} size={16} />
    )
  ) : (
    <CodeIcon color={"currentColor"} size={16} />
  );

  return (
    <div ref={ref}>
      {props.isDisabled ? (
        <IconButton
          icon={<CodeIcon color={"currentColor"} size={16} />}
          isDisabled={props.isDisabled}
          onClick={props.onClick}
        />
      ) : (
        <s.Outline>
          <s.CodeButton icon={icon} onClick={props.onClick} />
        </s.Outline>
      )}
    </div>
  );
};

export const CodeButton = forwardRef(CodeButtonComponent);
