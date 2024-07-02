import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { usePrevious } from "../../../hooks/usePrevious";
import { isBoolean } from "../../../typeGuards/isBoolean";
import { ClockWithTicksIcon } from "../../common/icons/20px/ClockWithTicksIcon";
import { CodeIcon } from "../../common/icons/20px/CodeIcon";
import { OpenTelemetryLogoIcon } from "../../common/icons/20px/OpenTelemetryLogoIcon";
import { AnimatedCodeButton } from "./AnimatedCodeButton";
import { GlowingIconButton } from "./GlowingIconButton";
import * as s from "./styles";
import { CodeButtonProps } from "./types";

const CodeButtonComponent = (
  {
    hasData,
    hasErrors,
    hasObservability,
    isDisabled,
    isAlreadyAtScope,
    onClick,
    onMouseEnter,
    onMouseLeave
  }: CodeButtonProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [isHovered, setIsHovered] = useState(false);
  const previousIsHovered = usePrevious(isHovered);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (isBoolean(previousIsHovered) && previousIsHovered !== isHovered) {
      if (isHovered) {
        onMouseEnter();
      } else {
        onMouseLeave();
      }
    }
  }, [onMouseEnter, onMouseLeave, previousIsHovered, isHovered]);

  const getButtonComponent = () => {
    if (Boolean(isDisabled) || isAlreadyAtScope) {
      return (
        <s.ExtendedIconButton
          icon={<CodeIcon color={"currentColor"} size={20} />}
          isDisabled={isDisabled}
          isActive={isAlreadyAtScope}
        />
      );
    }

    if (hasErrors) {
      return (
        <GlowingIconButton
          icon={<CodeIcon color={"currentColor"} size={20} />}
          type={"error"}
        />
      );
    }

    if (!hasObservability) {
      return (
        <GlowingIconButton
          icon={<OpenTelemetryLogoIcon color={"currentColor"} size={20} />}
        />
      );
    }

    if (!hasData) {
      return (
        <GlowingIconButton
          icon={<ClockWithTicksIcon color={"currentColor"} size={20} />}
        />
      );
    }

    return <AnimatedCodeButton />;
  };

  return (
    <s.Container
      ref={ref}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {getButtonComponent()}
    </s.Container>
  );
};

export const CodeButton = forwardRef(CodeButtonComponent);
