import { ForwardedRef, forwardRef, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import * as s from "./styles";
import { FadingContentSwitchProps } from "./types";

const TRANSITION_CLASS_NAME = "fading";
const TRANSITION_DURATION = 300;

export const FadingContentSwitchComponent = (
  { switchFlag, children, className }: FadingContentSwitchProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const contentAContainerRef = useRef<HTMLDivElement>(null);
  const contentBContainerRef = useRef<HTMLDivElement>(null);

  if (children.length !== 2) {
    return null;
  }

  return (
    <s.Container className={className} ref={ref}>
      <CSSTransition
        in={switchFlag}
        timeout={TRANSITION_DURATION}
        classNames={TRANSITION_CLASS_NAME}
        nodeRef={contentAContainerRef}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <s.FadingContentContainer
          $transitionClassName={TRANSITION_CLASS_NAME}
          $transitionDuration={TRANSITION_DURATION}
          ref={contentAContainerRef}
        >
          {children[0]}
        </s.FadingContentContainer>
      </CSSTransition>
      <CSSTransition
        in={!switchFlag}
        timeout={TRANSITION_DURATION}
        classNames={TRANSITION_CLASS_NAME}
        nodeRef={contentBContainerRef}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <s.FadingContentContainer
          $transitionClassName={TRANSITION_CLASS_NAME}
          $transitionDuration={TRANSITION_DURATION}
          ref={contentBContainerRef}
        >
          {children[1]}
        </s.FadingContentContainer>
      </CSSTransition>
    </s.Container>
  );
};

export const FadingContentSwitch = forwardRef(FadingContentSwitchComponent);
