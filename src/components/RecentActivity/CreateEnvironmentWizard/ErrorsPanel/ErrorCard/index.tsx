import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { CrossIcon } from "../../../../common/icons/12px/CrossIcon";
import { ErrorIcon } from "../../../../common/icons/16px/ErrorIcon";
import * as s from "./styles";
import type { ErrorCardProps } from "./types";

const HIDE_INTERVAL = 4000;

const TRANSITION_CLASS_NAME = "error-container";
const DEFAULT_TRANSITION_DURATION = 500; // in milliseconds

export const ErrorCard = ({ title, description }: ErrorCardProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const hideTimerId = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  const startTimer = () => {
    hideTimerId.current = window.setTimeout(() => {
      setIsVisible(false);
    }, HIDE_INTERVAL);
  };

  const handleMouseEnter = () => {
    window.clearTimeout(hideTimerId.current);
  };

  const handleMouseLeave = () => {
    startTimer();
  };

  const handleCloseButtonClick = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    startTimer();
    return () => {
      window.clearTimeout(hideTimerId.current);
    };
  }, []);

  return (
    <CSSTransition
      in={isVisible}
      timeout={DEFAULT_TRANSITION_DURATION}
      classNames={TRANSITION_CLASS_NAME}
      unmountOnExit={true}
      nodeRef={containerRef}
    >
      <s.Container
        ref={containerRef}
        $transitionClassName={TRANSITION_CLASS_NAME}
        $transitionDuration={DEFAULT_TRANSITION_DURATION}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <s.ErrorIconContainer>
          <ErrorIcon size={16} color={"currentColor"} />
        </s.ErrorIconContainer>
        <s.ContentContainer>
          <s.Title>{title}</s.Title>
          <s.Description>{description}</s.Description>
        </s.ContentContainer>
        <s.CloseButton onClick={handleCloseButtonClick}>
          <CrossIcon color={"currentColor"} />
        </s.CloseButton>
      </s.Container>
    </CSSTransition>
  );
};
