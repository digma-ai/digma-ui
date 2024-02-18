import { ForwardedRef, forwardRef } from "react";
import { ClockWithTicksIcon } from "../../common/icons/20px/ClockWithTicksIcon";
import { CodeGradientIcon } from "../../common/icons/20px/CodeGradientIcon";
import { CodeIcon } from "../../common/icons/20px/CodeIcon";
import { OpenTelemetryLogoIcon } from "../../common/icons/20px/OpenTelemetryLogoIcon";
import * as s from "./styles";
import { CodeButtonProps } from "./types";

const getIcon = (
  isDisabled: boolean,
  isAlreadyAtCode: boolean,
  hasObservability: boolean,
  hasData: boolean
) => {
  if (!hasObservability) {
    return <OpenTelemetryLogoIcon color={"currentColor"} size={20} />;
  }

  if (isDisabled || isAlreadyAtCode) {
    return <CodeIcon color={"currentColor"} size={20} />;
  }

  if (hasData) {
    return <CodeGradientIcon color={"currentColor"} size={20} />;
  } else {
    return <ClockWithTicksIcon color={"currentColor"} size={20} />;
  }
};

const CodeButtonComponent = (
  props: CodeButtonProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const icon = getIcon(
    Boolean(props.isDisabled),
    props.isAlreadyAtScope,
    props.hasObservability,
    props.hasData
  );

  return (
    <div ref={ref}>
      {props.isDisabled || props.isAlreadyAtScope ? (
        <s.ExtendedIconButton
          icon={<CodeIcon color={"currentColor"} size={20} />}
          isDisabled={props.isDisabled}
          onClick={props.onClick}
          isActive={props.isAlreadyAtScope}
        />
      ) : (
        <s.OutlineBackground $isAnimated={props.hasData}>
          <s.Outline $isAnimated={props.hasData}>
            <s.CodeButton icon={icon} onClick={props.onClick} />
          </s.Outline>
        </s.OutlineBackground>
      )}
    </div>
  );
};

export const CodeButton = forwardRef(CodeButtonComponent);
