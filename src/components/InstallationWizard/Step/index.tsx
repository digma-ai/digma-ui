import { useRef } from "react";
import useDimensions from "react-cool-dimensions";
import { CSSTransition } from "react-transition-group";
import { useTheme } from "styled-components";
import { CheckmarkCircleInvertedIcon } from "../../common/icons/CheckmarkCircleInvertedIcon";
import * as s from "./styles";
import { StepProps } from "./types";

const TRANSITION_CLASS_NAME = "step";
const SKIP_LINK_TRANSITION_CLASS_NAME = "skip-link";
const NUMBER_TRANSITION_CLASS_NAME = "number-link";
const DEFAULT_TRANSITION_DURATION = 300; // in milliseconds

export const Step = (props: StepProps) => {
  const theme = useTheme();

  const transitionDuration =
    typeof props.transitionDuration === "number"
      ? props.transitionDuration
      : DEFAULT_TRANSITION_DURATION;

  const containerRef = useRef<HTMLDivElement>(null);
  const skipLinkRef = useRef<HTMLAnchorElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  const { observe, height } = useDimensions();

  const handleSkipLinkClick = () => {
    props.onSkip();
  };

  const handleHeaderClick = () => {
    props.onGoToStep(props.stepIndex);
  };

  const isActive = props.status === "active";

  return (
    <CSSTransition
      in={isActive}
      timeout={transitionDuration}
      classNames={TRANSITION_CLASS_NAME}
      nodeRef={containerRef}
    >
      <s.Container
        status={props.status}
        ref={containerRef}
        contentHeight={height}
        transitionClassName={TRANSITION_CLASS_NAME}
        transitionDuration={transitionDuration}
      >
        <s.ContentContainer>
          <s.Header
            status={props.status}
            transitionDuration={transitionDuration}
            onClick={handleHeaderClick}
          >
            <s.NumberContainer
              isActive={isActive}
              transitionDuration={transitionDuration}
            >
              <CheckmarkCircleInvertedIcon
                size={18}
                color={s.getNumberBackgroundColor(theme)}
              />
              <CSSTransition
                in={props.status !== "completed"}
                timeout={transitionDuration}
                classNames={NUMBER_TRANSITION_CLASS_NAME}
                nodeRef={numberRef}
                mountOnEnter={true}
                unmountOnExit={true}
              >
                <s.Number
                  ref={numberRef}
                  status={props.status}
                  transitionClassName={NUMBER_TRANSITION_CLASS_NAME}
                  transitionDuration={transitionDuration}
                >
                  {props.stepIndex + 1}
                </s.Number>
              </CSSTransition>
            </s.NumberContainer>

            {props.data.title}
            <CSSTransition
              in={isActive}
              timeout={transitionDuration}
              classNames={SKIP_LINK_TRANSITION_CLASS_NAME}
              nodeRef={skipLinkRef}
              mountOnEnter={true}
              unmountOnExit={true}
            >
              <s.SkipLink
                ref={skipLinkRef}
                onClick={handleSkipLinkClick}
                transitionClassName={SKIP_LINK_TRANSITION_CLASS_NAME}
                transitionDuration={transitionDuration}
              >
                Skip for now
              </s.SkipLink>
            </CSSTransition>
          </s.Header>
          <s.Content ref={observe}>{props.data.content}</s.Content>
        </s.ContentContainer>
      </s.Container>
    </CSSTransition>
  );
};
