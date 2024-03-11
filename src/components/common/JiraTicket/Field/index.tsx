import { useCallback, useRef } from "react";
import useDimensions from "react-cool-dimensions";
import useScrollbarSize from "react-scrollbar-size";
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
    <s.ContentContainer>
      <s.Content ref={getContentRef} $multiline={props.multiline}>
        {props.children}
        <s.ButtonContainer
          $position={iconPosition}
          $scrollbarOffset={scrollbarOffset}
        >
          {props.button}
        </s.ButtonContainer>
      </s.Content>
    </s.ContentContainer>
  );
};
