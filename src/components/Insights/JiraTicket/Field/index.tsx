import { useCallback, useRef } from "react";
import useDimensions from "react-cool-dimensions";
import useScrollbarSize from "react-scrollbar-size";
import { isString } from "../../../../typeGuards/isString";
import * as s from "./styles";
import { ButtonPosition, FieldProps } from "./types";

export const Field = (props: FieldProps) => {
  const scrollbar = useScrollbarSize();
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { observe } = useDimensions();

  const getContentRef = useCallback(
    (el: HTMLDivElement | null) => {
      observe(el);
      contentRef.current = el;
    },
    [observe]
  );

  const scrollbarOffset =
    contentRef.current &&
      contentRef.current.scrollHeight > contentRef.current.clientHeight
      ? scrollbar.width
      : 0;

  const iconPosition: ButtonPosition =
    props.multiline === true ? "top" : "center";

  return (
    <s.Container>
      <s.Label>{props.label}</s.Label>
      <s.ContentContainer>
        <s.Content ref={getContentRef} $multiline={props.multiline}>
          {props.content}
          <s.ButtonContainer
            $position={iconPosition}
            $scrollbarOffset={scrollbarOffset}
          >
            {props.button}
          </s.ButtonContainer>
        </s.Content>
      </s.ContentContainer>
      {isString(props.errorMessage) && (
        <s.ErrorMessage>{props.errorMessage}</s.ErrorMessage>
      )}
    </s.Container>
  );
};
