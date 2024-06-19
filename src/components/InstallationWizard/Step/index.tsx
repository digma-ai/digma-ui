import { useRef } from "react";
import useDimensions from "react-cool-dimensions";
import { CSSTransition } from "react-transition-group";
import { useTheme } from "styled-components";
import { CheckmarkCircleInvertedIcon } from "../../common/icons/CheckmarkCircleInvertedIcon";
import * as s from "./styles";
import { StepProps } from "./types";

const TRANSITION_CLASS_NAME = "step";
const NUMBER_TRANSITION_CLASS_NAME = "number-link";
const DEFAULT_TRANSITION_DURATION = 300; // in milliseconds

export const Step = ({
  transitionDuration = DEFAULT_TRANSITION_DURATION,
  status,
  stepIndex,
  onGoToStep,
  data
}: StepProps) => {
  const theme = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  const { observe, height } = useDimensions();

  const handleHeaderClick = () => {
    if (status === "completed") {
      onGoToStep(stepIndex);
    }
  };

  const isActive = status === "active";

  return (
    <CSSTransition
      in={isActive}
      timeout={transitionDuration}
      classNames={TRANSITION_CLASS_NAME}
      nodeRef={containerRef}
    >
      <s.Container
        $status={status}
        ref={containerRef}
        $contentHeight={height}
        $transitionClassName={TRANSITION_CLASS_NAME}
        $transitionDuration={transitionDuration}
      >
        <s.ContentContainer>
          <s.Header
            $status={status}
            $transitionDuration={transitionDuration}
            onClick={handleHeaderClick}
          >
            <s.NumberContainer
              $isActive={isActive}
              $transitionDuration={transitionDuration}
            >
              <CheckmarkCircleInvertedIcon
                size={18}
                color={s.getNumberBackgroundColor(theme)}
              />
              <CSSTransition
                in={status !== "completed"}
                timeout={transitionDuration}
                classNames={NUMBER_TRANSITION_CLASS_NAME}
                nodeRef={numberRef}
                mountOnEnter={true}
                unmountOnExit={true}
              >
                <s.Number
                  ref={numberRef}
                  $status={status}
                  $transitionClassName={NUMBER_TRANSITION_CLASS_NAME}
                  $transitionDuration={transitionDuration}
                >
                  {stepIndex + 1}
                </s.Number>
              </CSSTransition>
            </s.NumberContainer>
            {data.title}
          </s.Header>
          <s.Content ref={observe}>{data.content}</s.Content>
        </s.ContentContainer>
      </s.Container>
    </CSSTransition>
  );
};
