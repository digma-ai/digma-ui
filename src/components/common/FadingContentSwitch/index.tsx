import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import * as s from "./styles";
import { FadingContentSwitchProps } from "./types";

const TRANSITION_CLASS_NAME = "fading";
const TRANSITION_DURATION = 0;
const TRANSITION_DELAY = 200;

export const FadingContentSwitchComponent = (
  { switchFlag, children, className }: FadingContentSwitchProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [showTransition, setShowTransition] = useState(false);
  const contentAContainerRef = useRef<HTMLDivElement>(null);
  const contentBContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowTransition(true);
    }, TRANSITION_DELAY);

    return () => {
      window.clearTimeout(timer);
    };
  }, [switchFlag]);

  if (children.length !== 2) {
    return null;
  }

  return (
    <s.Container className={className} ref={ref}>
      <CSSTransition
        in={switchFlag && showTransition}
        timeout={TRANSITION_DURATION}
        classNames={TRANSITION_CLASS_NAME}
        nodeRef={contentAContainerRef}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <s.FadingContentContainer
          $transitionDuration={TRANSITION_DURATION}
          $transitionClassName={TRANSITION_CLASS_NAME}
          ref={contentAContainerRef}
        >
          {children[0]}
        </s.FadingContentContainer>
      </CSSTransition>
      <CSSTransition
        in={!switchFlag && showTransition}
        timeout={TRANSITION_DURATION}
        classNames={TRANSITION_CLASS_NAME}
        nodeRef={contentBContainerRef}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <s.FadingContentContainer
          $transitionDuration={TRANSITION_DURATION}
          $transitionClassName={TRANSITION_CLASS_NAME}
          ref={contentBContainerRef}
        >
          {children[1]}
        </s.FadingContentContainer>
      </CSSTransition>
    </s.Container>
  );
};

export const FadingContentSwitch = forwardRef(FadingContentSwitchComponent);
