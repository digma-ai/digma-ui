import { ForwardedRef, forwardRef } from "react";
import { ClockWithTicksIcon } from "../../common/icons/20px/ClockWithTicksIcon";
import { CodeIcon } from "../../common/icons/20px/CodeIcon";
import { OpenTelemetryLogoIcon } from "../../common/icons/20px/OpenTelemetryLogoIcon";
import { AnimatedCodeButton } from "./AnimatedCodeButton";
import { GlowingIconButton } from "./GlowingIconButton";
import * as s from "./styles";
import { CodeButtonProps } from "./types";

const CodeButtonComponent = (
  props: CodeButtonProps,
  ref: ForwardedRef<HTMLDivElement | HTMLButtonElement>
) => {
  if (props.isDisabled || props.isAlreadyAtScope) {
    return (
      <s.ExtendedIconButton
        ref={ref as ForwardedRef<HTMLButtonElement>}
        icon={<CodeIcon color={"currentColor"} size={20} />}
        isDisabled={props.isDisabled}
        onClick={props.onClick}
        isActive={props.isAlreadyAtScope}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      />
    );
  }

  if (props.hasErrors) {
    return (
      <GlowingIconButton
        ref={ref as ForwardedRef<HTMLDivElement>}
        icon={<CodeIcon color={"currentColor"} size={20} />}
        onClick={props.onClick}
        type={"error"}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      />
    );
  }

  if (!props.hasObservability) {
    return (
      <GlowingIconButton
        ref={ref as ForwardedRef<HTMLDivElement>}
        icon={<OpenTelemetryLogoIcon color={"currentColor"} size={20} />}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      />
    );
  }

  if (!props.hasData) {
    return (
      <GlowingIconButton
        ref={ref as ForwardedRef<HTMLDivElement>}
        icon={<ClockWithTicksIcon color={"currentColor"} size={20} />}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      />
    );
  }

  return (
    <AnimatedCodeButton
      ref={ref as ForwardedRef<HTMLButtonElement>}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    />
  );
};

export const CodeButton = forwardRef(CodeButtonComponent);
