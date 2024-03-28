import { useEffect, useRef, useState } from "react";
import { CrossIcon } from "../../../common/icons/12px/CrossIcon";
import { ErrorIcon } from "../../../common/icons/16px/ErrorIcon";
import * as s from "./styles";
import { ErrorCardProps } from "./types";

const HIDE_INTERVAL = 4000;

export const ErrorCard = ({ title, description }: ErrorCardProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const hideTimerId = useRef<number>();

  const startTimer = () => {
    hideTimerId.current = window.setTimeout(() => {
      setIsVisible(false);
    }, HIDE_INTERVAL);
  };

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <s.Container
      $isVisible={isVisible}
      onMouseEnter={() => {
        window.clearTimeout(hideTimerId.current);
      }}
      onMouseLeave={() => {
        startTimer();
      }}
    >
      <ErrorIcon size={16} color={"#fff"} />
      <s.ContentContainer>
        <s.Title>{title}</s.Title>
        <s.Description>{description}</s.Description>
      </s.ContentContainer>

      <s.CrossButton
        buttonType="tertiary"
        icon={() => <CrossIcon />}
        onClick={() => setIsVisible(false)}
      />
    </s.Container>
  );
};
