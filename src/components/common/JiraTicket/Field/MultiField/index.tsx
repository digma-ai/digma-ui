import { useCallback, useRef } from "react";
import useDimensions from "react-cool-dimensions";
import useScrollbarSize from "react-scrollbar-size";
import { isString } from "../../../../../typeGuards/isString";
import * as s from "../styles";
import { MultiFieldProps } from "./types";

export const MultiField = (props: MultiFieldProps) => {
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

  return (
    <s.Container $selectable={props.selectable}>
      <s.Label>{props.label}</s.Label>
      {props.contents &&
        props.contents.map((field, i) => {
          return (
            <s.ContentContainer key={"content-container-" + i.toString()}>
              <s.Content ref={getContentRef} $multiline={field.multiline}>
                {field.content}
                <s.ButtonContainer
                  $position={field.multiline === true ? "top" : "center"}
                  $scrollbarOffset={scrollbarOffset}
                >
                  {field.button}
                </s.ButtonContainer>
              </s.Content>
            </s.ContentContainer>
          );
        })}
      {isString(props.errorMessage) && (
        <s.ErrorMessage>{props.errorMessage}</s.ErrorMessage>
      )}
    </s.Container>
  );
};
