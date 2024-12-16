import { useCallback, useRef } from "react";
import useDimensions from "react-cool-dimensions";
import useScrollbarSize from "react-scrollbar-size";
import * as s from "./styles";
import type { ButtonPosition, FieldProps } from "./types";

export const Field = ({ multiline, children, button }: FieldProps) => {
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

  const iconPosition: ButtonPosition = multiline === true ? "top" : "center";

  return (
    <s.ContentContainer>
      <s.Content ref={getContentRef} $multiline={multiline}>
        {children}
        <s.ButtonContainer
          $position={iconPosition}
          $scrollbarOffset={scrollbarOffset}
        >
          {button}
        </s.ButtonContainer>
      </s.Content>
    </s.ContentContainer>
  );
};
