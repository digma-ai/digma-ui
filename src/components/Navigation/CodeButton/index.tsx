import { Scope } from "../../common/App/types";
import { CodeIcon } from "../../common/icons/CodeIcon";
import { CodeContext } from "../types";
import * as s from "./styles";
import { CodeButtonProps } from "./types";

export const CodeButton = (props: CodeButtonProps) => {
  const getCodeButtonState = (codeContext?: CodeContext): string => {
    if (!codeContext || codeContext.methodId === null) {
      return " (disabled)";
    }

    if (codeContext.isInstrumented === false) {
      return " (no observability)";
    }

    if ([null, true].includes(codeContext.isInstrumented)) {
      if (codeContext.spans.length === 0) {
        return " (no data)";
      } else {
        return " (has data)";
      }
    }

    return "";
  };

  const getTargetButtonTooltip = (scope?: Scope): string => {
    if (!scope) {
      return "";
    }

    if (scope.code.isAlreadyAtCode) {
      return " (Already at code)";
    }

    if (
      [...scope.code.codeDetailsList, scope.code.relatedCodeDetailsList]
        .length === 0
    ) {
      return " (Code not found)";
    } else {
      return " (Navigate to code)";
    }
  };

  return (
    <s.Outline $isVisible={!props.isDisabled}>
      <s.CodeButton icon={CodeIcon} isDisabled={props.isDisabled} />
    </s.Outline>
  );
};
